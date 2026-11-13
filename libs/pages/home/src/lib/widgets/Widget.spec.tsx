import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { widgetsApi } from '@yadoms/domain/widgets';
import { Widget, WidgetCreation, saveWidget } from './Widget';

vi.mock('@yadoms/domain/widgets', () => ({
  widgetsApi: { updateWidget: vi.fn().mockResolvedValue(undefined) },
}));

vi.mock('@yadoms/domain/keywords', () => ({
  keywordsApi: {
    loadKeywords: vi.fn().mockResolvedValue({ keywords: [] }),
  },
  devicesApi: { getFriendlyNames: vi.fn().mockResolvedValue(new Map()) },
  formatKeywordLabel: vi.fn(),
}));

beforeAll(() => {
  // Required by Mantine, not implemented by jsdom
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

function makeCreation(): WidgetCreation {
  return {
    configuration: {},
    onCreate: vi.fn().mockResolvedValue(undefined),
    onCancel: vi.fn(),
  };
}

function renderWidget(creation?: WidgetCreation) {
  return render(
    <MantineProvider>
      <Widget id={creation ? undefined : 1} creation={creation} />
    </MantineProvider>
  );
}

describe('Widget', () => {
  it('should not open settings of an existing widget on mount', () => {
    renderWidget();
    expect(screen.queryByText('Widget settings')).toBeNull();
  });

  it('should open settings of a widget being created on mount', async () => {
    renderWidget(makeCreation());
    expect(await screen.findByText('Widget settings')).toBeTruthy();
  });
});

describe('saveWidget', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should create the widget being created', async () => {
    const creation = makeCreation();
    await saveWidget(
      { creation },
      { title: 'title', configuration: { keywordId: 3 } }
    );
    expect(creation.onCreate).toHaveBeenCalledWith('title', { keywordId: 3 });
    expect(widgetsApi.updateWidget).not.toHaveBeenCalled();
  });

  it('should update an existing widget', async () => {
    await saveWidget(
      { id: 5 },
      { title: 'title', configuration: { keywordId: 3 } }
    );
    expect(widgetsApi.updateWidget).toHaveBeenCalledWith(5, {
      title: 'title',
      configuration: { keywordId: 3 },
    });
  });
});

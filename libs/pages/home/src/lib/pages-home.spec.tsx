import { fireEvent, render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { widgetsApi } from '@yadoms/domain/widgets';

import Home from './home';

vi.mock('@yadoms/domain/widgets', () => ({
  widgetsApi: { getPageWidgets: vi.fn().mockResolvedValue([]) },
}));

beforeAll(() => {
  // Required by MantineProvider, not implemented by jsdom
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

function renderHome() {
  return render(
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}

describe('PagesHome', () => {
  it('should render successfully', () => {
    const { baseElement } = renderHome();
    expect(baseElement).toBeTruthy();
  });

  it('should load the widgets of the page', () => {
    renderHome();
    expect(widgetsApi.getPageWidgets).toHaveBeenCalledWith(0);
  });

  it('should show the add widget button only in edit mode', () => {
    renderHome();
    expect(screen.queryByText('home.addWidget')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'home.edit' }));
    expect(screen.getByText('home.addWidget')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'home.editDone' }));
    expect(screen.queryByText('home.addWidget')).toBeNull();
  });
});

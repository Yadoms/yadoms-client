import { render } from '@testing-library/react';

import DomainWidgets from './domain-widgets';

describe('DomainWidgets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DomainWidgets />);
    expect(baseElement).toBeTruthy();
  });
});

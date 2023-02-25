import { render } from '@testing-library/react';

import Plugins from './plugins';

describe('Plugins', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Plugins />);
    expect(baseElement).toBeTruthy();
  });
});

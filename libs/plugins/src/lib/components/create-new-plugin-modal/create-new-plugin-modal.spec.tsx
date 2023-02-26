import { render } from '@testing-library/react';

import CreateNewPluginModal from './create-new-plugin-modal';

describe('CreateNewPluginModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateNewPluginModal />);
    expect(baseElement).toBeTruthy();
  });
});

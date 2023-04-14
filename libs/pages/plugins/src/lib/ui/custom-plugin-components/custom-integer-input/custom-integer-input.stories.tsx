import type { Meta } from '@storybook/react';
import { CustomIntegerInput } from './custom-integer-input';

const Story: Meta<typeof CustomIntegerInput> = {
  component: CustomIntegerInput,
  title: 'CustomIntegerInput',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
  },
};

import type { Meta } from '@storybook/react';
import { CustomStringInput } from './custom-string-input';

const Story: Meta<typeof CustomStringInput> = {
  component: CustomStringInput,
  title: 'CustomStringInput',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
  },
};

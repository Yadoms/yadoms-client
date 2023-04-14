import type { Meta } from '@storybook/react';
import { CustomCheckboxSection } from './custom-checkbox.section';

const Story: Meta<typeof CustomCheckboxSection> = {
  component: CustomCheckboxSection,
  title: 'CustomCheckboxSection',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
  },
};

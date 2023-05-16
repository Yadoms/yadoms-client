import type { Meta } from '@storybook/react';
import { CustomSection } from './custom-section';

const Story: Meta<typeof CustomSection> = {
  component: CustomSection,
  title: 'CustomSection',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
  },
};

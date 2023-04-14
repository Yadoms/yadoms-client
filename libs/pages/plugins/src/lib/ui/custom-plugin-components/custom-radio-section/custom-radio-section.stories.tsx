import type { Meta } from '@storybook/react';
import { CustomRadioSection } from './custom-radio-section';

const Story: Meta<typeof CustomRadioSection> = {
  component: CustomRadioSection,
  title: 'CustomRadioSection',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
  },
};

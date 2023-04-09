import type { Meta } from '@storybook/react';
import { CustomBoolCheckbox } from './CustomBoolCheckbox';

const Story: Meta<typeof CustomBoolCheckbox> = {
  component: CustomBoolCheckbox,
  title: 'CustomBoolCheckbox',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      defaultValue: true,
      name: 'checkbox',
    },
  },
};

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

export const WithDescription = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      defaultValue: true,
      name: 'checkbox',
      description: 'I am a description',
    },
  },
};

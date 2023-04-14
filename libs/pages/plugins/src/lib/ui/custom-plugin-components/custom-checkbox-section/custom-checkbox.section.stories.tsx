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
    pluginConfigurationSchemaField: {
      defaultValue: true,
      name: 'checkbox',
      description: 'I am a description',
      content: {
        first1: {
          type: 'int',
          required: true,
          name: 'Input label',
          defaultValue: 2,
          description: 'Input description',
        },
      },
    },
  },
};

import type { Meta } from '@storybook/react';
import { CustomComboSection } from './custom-combo-section';

const Story: Meta<typeof CustomComboSection> = {
  component: CustomComboSection,
  title: 'CustomComboSection',
};
export default Story;

export const WithoutNestedComponents = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      name: 'label',
      description: 'I am a description',
      content: {
        value1: {
          name: 'Option 1',
          description: 'I am a description 1',
        },
        value2: {
          name: 'Option 2',
          description: 'I am a description 2',
        },
      },
    },
  },
};

export const WithNestedComponents = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      name: 'Label',
      description: 'I am a description',
      type: 'comboSection',
      content: {
        first1: {
          name: 'First label',
          description: 'This a first description',
          type: 'section',
          content: {
            IPAddress: {
              type: 'int',
              required: true,
              name: 'Input label',
              defaultValue: 2,
              description: 'Input description',
            },
          },
        },
        first2: {
          name: 'Second label',
          description: 'Manual Paring',
          type: 'section',
          content: {
            IPAddress: {
              type: 'decimal',
              defaultValue: 2.4,
              name: 'Decimal label',
              description: 'Decimal description',
            },
          },
        },
      },
    },
  },
};

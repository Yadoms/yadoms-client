import type { Meta } from '@storybook/react';
import { CustomEnumSelect } from './custom-enum-select';

const Story: Meta<typeof CustomEnumSelect> = {
  component: CustomEnumSelect,
  title: 'CustomEnumSelect',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      type: 'enum',
      values: {
        First1: 123,
        First2: 456,
      },
      defaultValue: 'First1',
      name: 'Enum label',
      description: 'Enum description',
    },
  },
};

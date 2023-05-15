import type { Meta } from '@storybook/react';
import { CustomDecimalNumber } from './custom-decimal-number';

const Story: Meta<typeof CustomDecimalNumber> = {
  component: CustomDecimalNumber,
  title: 'CustomDecimalNumber',
};
export default Story;

export const Primary = {
  args: {
    pluginKey: '',
    pluginConfigurationSchemaField: {
      defaultValue: 1.1,
      name: 'Decimal',
      description: 'I am a description',
    },
  },
};

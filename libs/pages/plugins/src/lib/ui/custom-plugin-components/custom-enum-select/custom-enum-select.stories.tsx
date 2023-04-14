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
  },
};

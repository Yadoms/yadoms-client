import { ComponentType } from 'react';
import YButton from './ybutton';
import KeywordLog from './keywordLog';
import { WidgetProps } from './Widget';

export interface WidgetTypeDefinition {
  component: ComponentType<WidgetProps>;
  size: 'small' | 'wide';
  defaultConfiguration: object;
}

// Keys are the widget types known by the server
export const widgetTypes: Record<string, WidgetTypeDefinition> = {
  switch: {
    component: YButton,
    size: 'small',
    defaultConfiguration: { invert: false, askConfirmation: false },
  },
  keywordLog: {
    component: KeywordLog,
    size: 'wide',
    defaultConfiguration: { keywordIds: [] },
  },
};

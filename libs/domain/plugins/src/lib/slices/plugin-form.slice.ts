import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaType,
} from '../model/plugin-configuration-schema.model';
import { RootState } from '@yadoms/store';

interface PluginForm {
  type: string;
  displayName: string;
  configuration: Record<string, unknown>;
}
export const PLUGIN_FORM_FEATURE_KEY = 'pluginForm';

const pluginFormSlice = createSlice({
  name: PLUGIN_FORM_FEATURE_KEY,
  initialState: {
    type: '',
    displayName: '',
    configuration: {},
  },
  reducers: {
    setForm: (state, action) => {
      const {
        type,
        displayName,
        configurationSchema,
      }: {
        type: string;
        displayName: string;
        configurationSchema: PluginConfigurationSchema;
      } = action.payload;

      state.type = type;
      state.displayName = displayName;
      state.configuration = getFromInitialValues(configurationSchema);
    },
  },
});

const getFromInitialValues = (
  configurationSchema: PluginConfigurationSchema
): Record<string, unknown> => {
  const newInitialValues: Record<string, unknown> = {};

  for (const [key, field] of Object.entries(configurationSchema)) {
    let sectionKeys: string[] = [];
    let firstSectionKey: string | undefined;

    switch (field.type) {
      case PluginConfigurationSchemaType.String:
        newInitialValues[key] = field.defaultValue ?? '';
        break;
      case PluginConfigurationSchemaType.Integer:
        newInitialValues[key] = field.defaultValue ?? 0;
        break;
      case PluginConfigurationSchemaType.Boolean:
        newInitialValues[key] = field.defaultValue ?? false;
        break;
      case PluginConfigurationSchemaType.Decimal:
        newInitialValues[key] = field.defaultValue ?? 0.0;
        break;
      case PluginConfigurationSchemaType.Enum:
        newInitialValues[key] = field.defaultValue;
        break;
      case PluginConfigurationSchemaType.Section:
        newInitialValues[key] = {
          content: getFromInitialValues(field.content || {}),
        };
        break;
      case PluginConfigurationSchemaType.ComboSection:
        sectionKeys = Object.keys(field.content || {});
        if (sectionKeys.length > 0) {
          firstSectionKey = sectionKeys[0];
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
            activeSection: firstSectionKey,
            activeSectionText: firstSectionKey,
          };
        } else {
          newInitialValues[key] = {
            content: getFromInitialValues(field.content || {}),
          };
        }
        break;
      default:
        break;
    }
  }

  return newInitialValues;
};

export const selectFormInitialState = createSelector(
  (state: RootState) => state.pluginForm,
  (pluginForm) => pluginForm
);
export const pluginFormActions = pluginFormSlice.actions;
export const pluginFormReducer = pluginFormSlice.reducer;

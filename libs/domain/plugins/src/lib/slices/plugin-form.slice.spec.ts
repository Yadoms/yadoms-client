import { configureStore } from '@reduxjs/toolkit';
import { PluginConfigurationSchemaType } from '../model/plugin-configuration-schema.model';
import { pluginFormReducer, pluginFormActions } from './plugin-form.slice';

describe('Plugin form store', () => {
  const store = configureStore({
    reducer: pluginFormReducer,
  });
  describe(`setup the correct form`, () => {
    describe(`for string type`, () => {
      test(`should return empty string when defaultValue does not exist`, () => {
        const payload = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            StringKey: {
              type: PluginConfigurationSchemaType.String,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.type).toBe('type');
        expect(state.displayName).toBe('displayName');
        expect(state.configuration).toEqual({
          StringKey: '',
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            StringKey: {
              type: PluginConfigurationSchemaType.String,
              defaultValue: 'default value',
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          StringKey: 'default value',
        });
      });
    });
    describe(`for int type`, () => {
      test(`should return 0 when defaultValue does not exist`, () => {
        const payload = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            IntKey: {
              type: PluginConfigurationSchemaType.Integer,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          IntKey: 0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            IntKey: {
              type: PluginConfigurationSchemaType.Integer,
              defaultValue: 10,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          IntKey: 10,
        });
      });
    });
    describe(`for bool type`, () => {
      test(`should return false when defaultValue does not exist`, () => {
        const payload = {
          configurationSchema: {
            BoolKey: {
              type: PluginConfigurationSchemaType.Boolean,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          BoolKey: false,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload = {
          configurationSchema: {
            BoolKey: {
              type: PluginConfigurationSchemaType.Boolean,
              defaultValue: true,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          BoolKey: true,
        });
      });
    });
    describe(`for decimal type`, () => {
      test(`should return 0.0 when defaultValue does not exist`, () => {
        const payload = {
          configurationSchema: {
            DecimalKey: {
              type: PluginConfigurationSchemaType.Decimal,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          DecimalKey: 0.0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload = {
          configurationSchema: {
            DecimalKey: {
              type: PluginConfigurationSchemaType.Decimal,
              defaultValue: 1.2,
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration).toEqual({
          DecimalKey: 1.2,
        });
      });
    });
    describe(`for ComboSection type`, () => {
      test(`should return empty when ComboSection content is empty`, () => {
        const payload = {
          configurationSchema: {
            emptySectionContent: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {},
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(state.configuration['emptySectionContent'].content).toEqual({});
      });
      test(`should return active comboSection`, () => {
        const payload = {
          configurationSchema: {
            FieldWithComboSection: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {
                activeSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {},
                },
                inactiveSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {},
                },
              },
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(
          state.configuration['FieldWithComboSection'].activeSection
        ).toEqual('activeSection');
        expect(
          state.configuration['FieldWithComboSection'].activeSectionText
        ).toEqual('activeSection');
      });
    });
    describe(`for section type`, () => {
      test(`should return empty content when no content`, () => {
        const payload = {
          configurationSchema: {
            FieldWithComboSection: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {
                activeSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {},
                },
              },
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(
          state.configuration['FieldWithComboSection'].content['activeSection']
            .content
        ).toEqual({});
      });
      test(`should return content when nested content`, () => {
        const payload = {
          configurationSchema: {
            FieldWithComboSection: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {
                activeSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {
                    StringKey: {
                      type: PluginConfigurationSchemaType.String,
                      defaultValue: 'defaultString',
                    },
                  },
                },
              },
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(
          state.configuration['FieldWithComboSection'].content['activeSection']
            .content['StringKey']
        ).toEqual('defaultString');
      });
    });
    describe(`for enum type`, () => {
      test(`should return defaultValue`, () => {
        const payload = {
          configurationSchema: {
            FieldWithComboSection: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {
                activeSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {
                    enum: {
                      type: PluginConfigurationSchemaType.Enum,
                      defaultValue: 'DefaultValue',
                    },
                  },
                },
                inactiveSection: {
                  type: PluginConfigurationSchemaType.Section,
                  content: {
                    enum: {
                      type: PluginConfigurationSchemaType.Enum,
                      defaultValue: 'DefaultValue',
                    },
                  },
                },
              },
            },
          },
        };
        store.dispatch(pluginFormActions.setForm(payload));

        const state = store.getState();
        expect(
          state.configuration['FieldWithComboSection'].content['activeSection']
            .content['enum']
        ).toEqual('DefaultValue');
      });
    });
  });
});

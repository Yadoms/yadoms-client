import { PluginConfigurationSchemaType } from '../model/plugin-configuration-schema.model';
import { getInitialValues, InitialValues } from './plugin-form.service';

describe('Plugin form store', () => {
  describe(`setup the correct form`, () => {
    describe(`for string type`, () => {
      test(`should return empty string when defaultValue does not exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            StringKey: {
              type: PluginConfigurationSchemaType.String,
            },
          },
        };
        const initialValues = getInitialValues(payload);

        expect(initialValues.type).toBe('type');
        expect(initialValues.displayName).toBe('displayName');
        expect(initialValues.configuration).toEqual({
          StringKey: '',
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            StringKey: {
              type: PluginConfigurationSchemaType.String,
              defaultValue: 'default value',
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          StringKey: 'default value',
        });
      });
    });
    describe(`for int type`, () => {
      test(`should return 0 when defaultValue does not exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            IntKey: {
              type: PluginConfigurationSchemaType.Integer,
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          IntKey: 0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            IntKey: {
              type: PluginConfigurationSchemaType.Integer,
              defaultValue: 10,
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          IntKey: 10,
        });
      });
    });
    describe(`for bool type`, () => {
      test(`should return false when defaultValue does not exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            BoolKey: {
              type: PluginConfigurationSchemaType.Boolean,
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          BoolKey: false,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            BoolKey: {
              type: PluginConfigurationSchemaType.Boolean,
              defaultValue: true,
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          BoolKey: true,
        });
      });
    });
    describe(`for decimal type`, () => {
      test(`should return 0.0 when defaultValue does not exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            DecimalKey: {
              type: PluginConfigurationSchemaType.Decimal,
            },
          },
        };
        const initialValues = getInitialValues(payload);

        expect(initialValues.configuration).toEqual({
          DecimalKey: 0.0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            DecimalKey: {
              type: PluginConfigurationSchemaType.Decimal,
              defaultValue: 1.2,
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(initialValues.configuration).toEqual({
          DecimalKey: 1.2,
        });
      });
    });
    describe(`for ComboSection type`, () => {
      test(`should return empty when ComboSection content is empty`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
          configurationSchema: {
            emptySectionContent: {
              type: PluginConfigurationSchemaType.ComboSection,
              content: {},
            },
          },
        };
        const initialValues = getInitialValues(payload);
        expect(
          initialValues.configuration['emptySectionContent'].content
        ).toEqual({});
      });
      test(`should return active comboSection`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
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
        const initialValues = getInitialValues(payload);
        expect(
          initialValues.configuration['FieldWithComboSection'].activeSection
        ).toEqual('activeSection');
      });
    });
    describe(`for section type`, () => {
      test(`should return empty content when no content`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
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
        const initialValues = getInitialValues(payload);
        expect(
          initialValues.configuration['FieldWithComboSection'].content[
            'activeSection'
          ].content
        ).toEqual({});
      });
      test(`should return content when nested content`, () => {
        const payload: InitialValues = {
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
        const initialValues = getInitialValues(payload);
        expect(
          initialValues.configuration['FieldWithComboSection'].content[
            'activeSection'
          ].content['StringKey']
        ).toEqual('defaultString');
      });
    });
    describe(`for enum type`, () => {
      test(`should return defaultValue`, () => {
        const payload: InitialValues = {
          type: 'type',
          displayName: 'displayName',
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
        const initialValues = getInitialValues(payload);
        expect(
          initialValues.configuration['FieldWithComboSection'].content[
            'activeSection'
          ].content['enum']
        ).toEqual('DefaultValue');
      });
    });
  });
});

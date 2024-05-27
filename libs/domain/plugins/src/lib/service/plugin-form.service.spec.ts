import { PluginConfigurationSchemaType } from '../model/plugin-configuration-schema.model';
import {
  getInitialValues,
  getInitialValuesFromSectionFields,
  InitialValues,
} from './plugin-form.service';

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
describe(`getInitialValuesFromSectionFields`, () => {
  describe(`for comboSection`, () => {
    test(`with one content`, () => {});
  });
  test(`for comboSection`, () => {
    getInitialValuesFromSectionFields(
      [
        {
          key: 'APIKey',
          path: 'configuration.APIKey',
          field: {
            type: 'string',
            required: true,
            regex: '[a-zA-Z0-9]{64}',
            name: "Clé d'API",
            description:
              'Cette clé est nécessaire pour le fonctionnement de votre plugin. Elle peut être obtenue sur simple inscription (gratuite) au [Lametric](https://developer.lametric.com/user/devices).',
            regexErrorMessage: "Ce n'est pas une API KEY valide",
          },
        },
        {
          key: 'PairingMode',
          path: 'configuration.PairingMode',
          field: {
            type: 'comboSection',
            content: {
              Automatic: {
                name: 'Appairage automatique',
                type: 'section',
                content: {
                  Port: {
                    type: 'enum',
                    values: {
                      Http: 8080,
                      Https: 4343,
                    },
                    defaultValue: 'Https',
                    name: 'Port',
                    description:
                      'Le port de communication de Lametric (exemple Http: 8080, Https: 4343)',
                  },
                },
                description:
                  'Appairage automatique en utilisant le protocole UPNP',
              },
              Manual: {
                name: 'Appairage manuel',
                type: 'section',
                content: {
                  IPAddress: {
                    type: 'string',
                    regex: '^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$',
                    required: true,
                    name: 'Adresse IP',
                    description: "L'adresse IP du module",
                    regexErrorMessage: "Ce n'est pas une adresse IP valide",
                  },
                  Port: {
                    type: 'enum',
                    values: {
                      Http: 8080,
                      Https: 4343,
                    },
                    defaultValue: 'Https',
                    name: 'Port',
                    description:
                      'Le port de communication de Lametric (exemple Http: 8080, Https: 4343)',
                  },
                },
                description: 'Appairage manuel',
              },
            },
            name: "Mode d'appairage",
          },
        },
      ],
      '',
      ''
    );
  });
});

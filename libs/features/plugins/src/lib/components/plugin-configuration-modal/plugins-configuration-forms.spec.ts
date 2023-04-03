import { describe, expect, test } from 'vitest';
import { getFromInitialValues } from './plugins-configuration-forms';
import { PluginConfigurationSchema } from '../plugin-configuration/plugin-configuration';

describe('Plugin configuration forms', () => {
  describe(`getFromInitialValues`, () => {
    describe(`for string type`, () => {
      test(`should return empty string when defaultValue does not exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: 'string',
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: '',
        });
      });
      test(`should return default value when the value exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: 'string',
            defaultValue: 'default value',
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: 'default value',
        });
      });
    });
    describe(`for int type`, () => {
      test(`should return 0 when defaultValue does not exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: 'int',
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: 0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: 'int',
            defaultValue: 10,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: 10,
        });
      });
    });
  });
});

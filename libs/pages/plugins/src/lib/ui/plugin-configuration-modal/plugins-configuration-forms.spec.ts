import { describe, expect, test } from 'vitest';
import { getFromInitialValues } from './plugins-configuration-forms';
import {
  PluginConfigurationSchema,
  PluginConfigurationSchemaType,
} from '../../model/plugin-configuration-schema.model';

describe('Plugin configuration forms', () => {
  describe(`getFromInitialValues`, () => {
    describe(`for string type`, () => {
      test(`should return empty string when defaultValue does not exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: PluginConfigurationSchemaType.String,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: '',
        });
      });
      test(`should return default value when the value exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: PluginConfigurationSchemaType.String,
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
            type: PluginConfigurationSchemaType.Integer,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: 0,
        });
      });
      test(`should return default value when the value exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: PluginConfigurationSchemaType.Integer,
            defaultValue: 10,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: 10,
        });
      });
    });
    describe(`for bool type`, () => {
      test(`should return false when defaultValue does not exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: PluginConfigurationSchemaType.Boolean,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: false,
        });
      });
      test(`should return default value when the value exist`, () => {
        const configurationSchema: PluginConfigurationSchema = {
          APIKey: {
            type: PluginConfigurationSchemaType.Boolean,
            defaultValue: true,
          },
        };
        expect(getFromInitialValues(configurationSchema)).toStrictEqual({
          APIKey: true,
        });
      });
    });
  });
});

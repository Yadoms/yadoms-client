import { TextInput } from '@mantine/core';

// interface ConfigurationSchemaValue {
//   type: 'string' | 'int' | 'enum' | 'comboSection';
//   required?: boolean;
//   regex?: string;
//   values?: Record<string, string>;
//   content?: Record<string, ConfigurationSchemaValue>;
//   defaultValue?: string;
// }
//
// interface PackageConfigurationSchema {
//   [key: string]: ConfigurationSchemaValue;
// }
//
// interface LocalesConfigSchemaValue {
//   name?: string;
//   description?: string;
//   type?: 'string' | 'int' | 'enum' | 'comboSection';
//   regexErrorMessage?: string;
//   customLabels?: Record<string, string>;
//   content?: Record<string, LocalesConfigSchemaValue>;
//   defaultValue?: string;
// }
//
// interface LocalesConfigSchema {
//   [key: string]: LocalesConfigSchemaValue;
// }
//
// interface PluginConfigSchema {
//   package: PackageConfigurationSchema;
//   locales: LocalesConfigSchema;
// }
// /* eslint-disable-next-line */
// export interface PluginConfigurationProps {
//   configurationSchema: PackageConfigurationSchema;
// }

export interface ConfigurationSchema {
  [key: string]: {
    type:
      | 'string'
      | 'int'
      | 'bool'
      | 'section'
      | 'comboSection'
      | 'radioSection'
      | 'enum';
    regex?: string;
    description?: string;
    required?: boolean;
    encrypted?: boolean;
    defaultValue?: number | boolean | string;
    enableWithCheckBox?: boolean;
    checkbox?: {
      defaultValue: boolean;
    };
    content?: ConfigurationSchema;
  };
}

interface PluginConfigurationProps {
  configurationSchema: ConfigurationSchema;
}
export function PluginConfiguration(props: ConfigurationSchema) {
  const renderField = (key: string, field: any) => {
    switch (field.type) {
      case 'string':
        return (
          <TextInput
            label={key}
            placeholder="Plugin name"
            description={field.description}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            withAsterisk
          />
        );
      case 'int':
        return (
          <div key={key}>
            <label>{key}</label>
            <input type="number" />
          </div>
        );
      case 'section':
        return (
          <div key={key}>
            <label>{key}</label>
            <div style={{ marginLeft: '20px' }}>
              {field.content &&
                Object.entries(field.content).map(([key, value]) =>
                  renderField(key, value)
                )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {Object.entries(props.configurationSchema).map(([key, value]) =>
        renderField(key, value)
      )}
    </div>
  );
}

export default PluginConfiguration;

import { NumberInput, TextInput } from '@mantine/core';

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

export interface PluginConfigurationSchema {
  [key: string]: {
    type?:
      | 'string'
      | 'int'
      | 'bool'
      | 'section'
      | 'comboSection'
      | 'radioSection'
      | 'enum';
    regex?: string;
    regexErrorMessage?: string;
    description?: string;
    name?: string;
    required?: boolean | string;
    encrypted?: boolean;
    defaultValue?: number | boolean | string;
    enableWithCheckBox?: boolean;
    checkbox?: {
      defaultValue: boolean;
    };
    content?: PluginConfigurationSchema;
  };
}

interface PluginConfigurationProps {
  configurationSchema: PluginConfigurationSchema;
  selectedPluginType: string;
}
export function PluginConfiguration(props: PluginConfigurationProps) {
  const renderField = (key: string, field: any) => {
    switch (field.type) {
      case 'string':
        return (
          <TextInput
            label={field.name}
            placeholder={field.name}
            description={field.description}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            withAsterisk={!!field.required}
          />
        );
      case 'int':
        return (
          <NumberInput
            label={field.name}
            description={field.description}
            placeholder={field.name}
            defaultValue={field.defaultValue}
            inputWrapperOrder={['label', 'error', 'input', 'description']}
            withAsterisk={!!field.required}
            min={0}
          />
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
      <TextInput
        label="Name"
        placeholder="Plugin name"
        defaultValue={props.selectedPluginType}
        description="custom plugin Name"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
        withAsterisk
      />
      {Object.entries(props.configurationSchema).map(([key, value]) =>
        renderField(key, value)
      )}
    </div>
  );
}

export default PluginConfiguration;

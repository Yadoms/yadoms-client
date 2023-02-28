import React, { useState } from 'react';
import { TextInput } from '@mantine/core';

export interface ConfigurationSchema {
  [key: string]: {
    type: 'string' | 'int' | 'section';
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

interface Props {
  configurationSchema: ConfigurationSchema;
}

const DynamicForm: React.FC<Props> = ({ configurationSchema }) => {
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
      {Object.entries(configurationSchema).map(([key, value]) =>
        renderField(key, value)
      )}
    </div>
  );
};

export default DynamicForm;

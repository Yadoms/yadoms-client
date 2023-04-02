import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import PluginConfigurationModal from '../plugin-configuration-modal/plugin-configuration-modal';
import ChoosePluginModal from '../choose-plugin-modal/choose-plugin-modal';
import { useSelector } from 'react-redux';
import { getAvailablePluginConfigurationSchema } from '../../redux/available-plugins.slice';

export interface CreateNewPluginProps {
  opened: boolean;
  onClose: () => void;
}
export function CreateNewPlugin(props: CreateNewPluginProps) {
  const [openedChoosePluginModal, choosePluginModalHandlers] =
    useDisclosure(false);
  const [openedPluginConfigurationModal, pluginConfigurationModalHandlers] =
    useDisclosure(false);
  const [selectedPluginType, setSelectedPluginType] = useState('');

  const selectedPluginConfigurationSchema = useSelector(
    getAvailablePluginConfigurationSchema(selectedPluginType)
  );

  useEffect(() => {
    choosePluginModalHandlers.open();
  }, []);

  useEffect(() => {
    console.log(selectedPluginType);
    console.log(
      'selectedPluginConfigurationSchema',
      selectedPluginConfigurationSchema
    );
  }, [selectedPluginType, selectedPluginConfigurationSchema]);

  const handlePluginSelect = (selectedPluginType: string) => {
    console.log('Selected plugin id:', selectedPluginType);
    setSelectedPluginType(selectedPluginType);
    pluginConfigurationModalHandlers.open();
    choosePluginModalHandlers.close();
  };

  function closePluginConfigurationModal() {
    pluginConfigurationModalHandlers.close();
    choosePluginModalHandlers.open();
  }

  function closeChoosePluginModal() {
    choosePluginModalHandlers.close();
    props.onClose();
  }

  return (
    <>
      {props.opened && (
        <ChoosePluginModal
          opened={openedChoosePluginModal}
          onClose={() => closeChoosePluginModal()}
          selectedPluginId={selectedPluginType}
          onPluginSelect={handlePluginSelect}
        />
      )}
      <PluginConfigurationModal
        opened={openedPluginConfigurationModal}
        onClose={() => closePluginConfigurationModal()}
        selectedPluginType={selectedPluginType}
        selectedPluginConfigurationSchema={selectedPluginConfigurationSchema}
      ></PluginConfigurationModal>
    </>
  );
}

export default CreateNewPlugin;

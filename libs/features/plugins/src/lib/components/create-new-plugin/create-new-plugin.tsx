import { useEffect, useState } from 'react';
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
    useDisclosure(true);
  const [openedPluginConfigurationModal, pluginConfigurationModalHandlers] =
    useDisclosure(false);
  const [selectedPluginType, setSelectedPluginType] = useState('');

  const selectedPluginConfigurationSchema = useSelector(
    getAvailablePluginConfigurationSchema(selectedPluginType)
  );

  const handlePluginSelect = (selectedPluginType: string) => {
    setSelectedPluginType(selectedPluginType);
    choosePluginModalHandlers.close();
    pluginConfigurationModalHandlers.open();
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
      <ChoosePluginModal
        opened={openedChoosePluginModal}
        onClose={() => closeChoosePluginModal()}
        selectedPluginId={selectedPluginType}
        onPluginSelect={handlePluginSelect}
      />
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

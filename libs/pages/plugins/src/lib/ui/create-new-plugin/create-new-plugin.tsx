import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import PluginConfigurationModal from '../plugin-configuration-modal/plugin-configuration-modal';
import ChoosePluginModal from '../choose-plugin-modal/choose-plugin-modal';
import { getAvailablePluginConfigurationSchema } from '@yadoms/domain/plugins';
import { useAppSelector } from '@yadoms/store';

export interface CreateNewPluginProps {
  opened: boolean;
  onClose: () => void;
}
export function CreateNewPlugin(props: CreateNewPluginProps) {
  const [pluginSelected, setPluginSelected] = useState(false);
  const [openedChoosePluginModal, choosePluginModalHandlers] =
    useDisclosure(true);
  const [openedPluginConfigurationModal, pluginConfigurationModalHandlers] =
    useDisclosure(false);
  const [selectedPluginType, setSelectedPluginType] = useState('');

  const selectedPluginConfigurationSchema = useAppSelector(
    getAvailablePluginConfigurationSchema(selectedPluginType)
  );

  const handlePluginSelect = (selectedPluginType: string) => {
    setSelectedPluginType(selectedPluginType);
    setPluginSelected(true);
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
      {pluginSelected && (
        <PluginConfigurationModal
          opened={openedPluginConfigurationModal}
          onClose={() => closePluginConfigurationModal()}
          selectedPluginType={selectedPluginType}
          selectedPluginConfigurationSchema={selectedPluginConfigurationSchema}
        />
      )}
    </>
  );
}

export default CreateNewPlugin;

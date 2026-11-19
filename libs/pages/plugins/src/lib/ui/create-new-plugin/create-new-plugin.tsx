import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import PluginConfigurationModal from '../plugin-configuration-modal/plugin-configuration-modal';
import ChoosePluginModal from '../choose-plugin-modal/choose-plugin-modal';
import { selectAvailablePluginEntityByType } from '@yadoms/domain/plugins';
import { useAppSelector } from '@yadoms/store';

export interface CreateNewPluginProps {
  opened: boolean;
  onClose: () => void;
  onPluginCreated: () => void;
}

export function CreateNewPlugin(props: CreateNewPluginProps) {
  const [openedChoosePluginModal, choosePluginModalHandlers] =
    useDisclosure(true);
  const [openedPluginConfigurationModal, pluginConfigurationModalHandlers] =
    useDisclosure(false);
  const [selectedPluginType, setSelectedPluginType] = useState('');

  const selectedPlugin = useAppSelector(
    selectAvailablePluginEntityByType(selectedPluginType)
  );

  const handlePluginSelect = (selectedPluginType: string) => {
    setSelectedPluginType(selectedPluginType);
    choosePluginModalHandlers.close();
    pluginConfigurationModalHandlers.open();
  };

  function closePluginConfigurationModal() {
    setSelectedPluginType('');
    pluginConfigurationModalHandlers.close();
    choosePluginModalHandlers.open();
  }

  function closeChoosePluginModal() {
    choosePluginModalHandlers.close();
    props.onClose();
  }

  function handlePluginCreated() {
    pluginConfigurationModalHandlers.close();
    choosePluginModalHandlers.close();
    props.onPluginCreated();
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
      {selectedPlugin && (
        <PluginConfigurationModal
          key={selectedPlugin.type}
          opened={openedPluginConfigurationModal}
          onClose={() => closePluginConfigurationModal()}
          plugin={selectedPlugin}
          onPluginCreated={handlePluginCreated}
        />
      )}
    </>
  );
}

export default CreateNewPlugin;

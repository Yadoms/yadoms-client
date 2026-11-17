import { Box, Image } from '@mantine/core';
import { axiosInstance, Logo } from '@yadoms/shared';
import { PluginsInstancesEntity } from '@yadoms/domain/plugins';

export const SYSTEM_PLUGIN_INSTANCE_ID = 1;

function pluginIconUrl(pluginType: string) {
  return `${axiosInstance.defaults.baseURL}/plugins?byType=${pluginType}&prop=icon`;
}

export function PluginIcon({
  instance,
  size = 32,
}: {
  instance?: PluginsInstancesEntity;
  size?: number;
}) {
  if (!instance) {
    return (
      <Box w={size} h={size}>
        <Logo />
      </Box>
    );
  }
  return (
    <Image
      w={size}
      h={size}
      fit="contain"
      src={pluginIconUrl(instance.type)}
      alt={instance.type}
    />
  );
}

export default PluginIcon;

import { Box, Image } from '@mantine/core';
import { axiosInstance } from '../../http/axios-instance';
import { Logo } from '../logo/logo';

function pluginIconUrl(pluginType: string) {
  return `${axiosInstance.defaults.baseURL}/plugins?byType=${pluginType}&prop=icon`;
}

export function PluginIcon({
  pluginType,
  size = 32,
}: {
  /** Undefined for the system plugin */
  pluginType?: string;
  size?: number;
}) {
  if (!pluginType) {
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
      src={pluginIconUrl(pluginType)}
      alt={pluginType}
    />
  );
}

export default PluginIcon;

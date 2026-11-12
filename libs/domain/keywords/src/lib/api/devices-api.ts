import { axiosInstance } from '@yadoms/shared';

interface DeviceFriendlyName {
  id: number;
  friendlyName: string;
}

class DevicesApi {
  async getFriendlyNames(): Promise<Map<number, string>> {
    const friendlyNames = new Map<number, string>();
    const response = await axiosInstance.get<{
      devices: DeviceFriendlyName[];
    }>('/devices', {
      params: { prop: 'id|friendlyName' },
    });
    if (response.status === 204) return friendlyNames;

    for (const device of response.data.devices) {
      friendlyNames.set(device.id, device.friendlyName);
    }
    return friendlyNames;
  }
}

export const devicesApi = new DevicesApi();

import { axiosInstance } from '@yadoms/shared';

interface DeviceFriendlyName {
  id: number;
  friendlyName: string;
}

class DevicesApi {
  async getFriendlyName(deviceId: number): Promise<string | undefined> {
    const response = await axiosInstance.get<DeviceFriendlyName>(
      `/devices/${deviceId}`,
      { params: { prop: 'id|friendlyName' } }
    );
    if (response.status === 204) return undefined;
    return response.data.friendlyName;
  }

  /**
   * Returns all devices friendly names, or only those of deviceIds if provided
   */
  async getFriendlyNames(deviceIds?: number[]): Promise<Map<number, string>> {
    const friendlyNames = new Map<number, string>();

    if (deviceIds) {
      const uniqueIds = [...new Set(deviceIds)];
      const names = await Promise.all(
        uniqueIds.map((id) => this.getFriendlyName(id))
      );
      uniqueIds.forEach((id, index) => {
        const name = names[index];
        if (name !== undefined) friendlyNames.set(id, name);
      });
      return friendlyNames;
    }

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

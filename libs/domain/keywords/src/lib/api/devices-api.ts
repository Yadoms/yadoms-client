import { axiosInstance } from '@yadoms/shared';

interface DeviceFriendlyName {
  id: number;
  friendlyName: string;
}

export interface DeviceEntity {
  id: number;
  pluginInstance: number;
  friendlyName: string;
  model: string;
  type: string;
  blacklisted: boolean;
}

class DevicesApi {
  private async fetchDevices(withBlacklisted: boolean) {
    const response = await axiosInstance.get<{ devices: DeviceEntity[] }>(
      '/devices',
      {
        params: {
          prop: 'id|pluginInstance|friendlyName|model|type|blacklisted',
          withBlacklisted: withBlacklisted ? true : undefined,
        },
      }
    );
    if (response.status === 204) return [];
    return response.data.devices;
  }

  async getDevices(includeBlacklisted = false): Promise<DeviceEntity[]> {
    // The server returns only blacklisted devices when withBlacklisted is set,
    // and may or may not return them otherwise
    const [devices, blacklistedDevices] = await Promise.all([
      this.fetchDevices(false),
      includeBlacklisted ? this.fetchDevices(true) : [],
    ]);
    const devicesById = new Map<number, DeviceEntity>();
    for (const device of [...devices, ...blacklistedDevices]) {
      if (includeBlacklisted || !device.blacklisted) {
        devicesById.set(device.id, device);
      }
    }
    return [...devicesById.values()];
  }

  async setBlacklisted(deviceId: number, blacklisted: boolean) {
    await axiosInstance.patch(`/devices/${deviceId}`, {
      blacklist: blacklisted,
    });
  }

  async deleteDevice(deviceId: number) {
    await axiosInstance.delete(`/devices/${deviceId}`);
  }

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

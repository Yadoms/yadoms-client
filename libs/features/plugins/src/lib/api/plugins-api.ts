import { axiosInstance } from '@yadoms/shared';
import { PluginsInstancesResponse } from '../model/PluginsInstancesResponse';
import { AvailablePluginsResponse } from '../model/AvailablePluginsResponse';

export async function loadPluginsInstances(
  currentPage = 0,
  pageSize = 10
): Promise<PluginsInstancesResponse> {
  try {
    const response = await axiosInstance.get<PluginsInstancesResponse>(
      `/plugins-instances`,
      {
        params: {
          page: currentPage,
          perPage: pageSize,
        },
      }
    );
    if (response.status === 204) {
      return {
        instances: [],
        paging: {
          currentPage: 1,
          totalPage: 1,
          pageSize: 0,
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching Plugins instances:', error);
    throw error;
  }
}

export async function loadAvailablePlugins(): Promise<AvailablePluginsResponse> {
  try {
    const response = await axiosInstance.get<AvailablePluginsResponse>(
      `/plugins`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Plugins instances:', error);
    throw error;
  }
}

export async function savePluginsInstance(instanceId: number, data: object) {
  try {
    await axiosInstance.patch('/plugins-instances/' + instanceId, data);
  } catch (error) {
    console.error('Error fetching Plugins instances:', error);
    throw error;
  }
}

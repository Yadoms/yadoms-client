import { axiosInstance } from '@yadoms/shared';
import { PluginsInstancesResponse } from '../model/PluginsInstancesResponse';

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
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

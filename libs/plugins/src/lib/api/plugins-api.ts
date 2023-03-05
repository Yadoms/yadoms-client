import { axiosInstance } from '@yadoms/shared';
export async function loadPluginsInstances(currentPage = 0, pageSize = 10) {
  try {
    const response = await axiosInstance.get(`/plugins-instances`, {
      params: {
        page: currentPage,
        perPage: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

import { axiosInstance } from '@yadoms/shared';
import { PluginsInstancesResponse } from '../model/PluginsInstancesResponse';
import { AvailablePluginsResponse } from '../model/AvailablePluginsResponse';

class PluginsApi {
  async loadPluginsInstances(
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
      console.error('Error fetching plugins instances : ', error);
      throw error;
    }
  }

  async loadAvailablePlugins(): Promise<AvailablePluginsResponse> {
    try {
      const response = await axiosInstance.get<AvailablePluginsResponse>(
        `/plugins`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching available plugins : ', error);
      throw error;
    }
  }

  async createPluginsInstance(
    type: string,
    name: string,
    configuration: object
  ) {
    try {
      await axiosInstance.post('/plugins-instances/', {
        type: { type },
        displayName: { name },
        configuration: { configuration },
      });
    } catch (error) {
      console.error('Error creating plugin instance : ', error);
      throw error;
    }
  }

  async savePluginsInstance(instanceId: number, data: object) {
    try {
      await axiosInstance.patch('/plugins-instances/' + instanceId, data);
    } catch (error) {
      console.error('Error saving plugin instance : ', error);
      throw error;
    }
  }

  async startStopPluginsInstance(instanceId: number, start: boolean) {
    try {
      await axiosInstance.post(
        '/plugins-instances/' + instanceId + (start ? '/start' : '/stop')
      );
    } catch (error) {
      console.error('Error starting/stoping plugin instance : ', error);
      throw error;
    }
  }
}

export const pluginsApi = new PluginsApi();

import { axiosInstance } from '@yadoms/shared';
import { WidgetsResponse } from '../model/WidgetsResponse';

class WidgetsApi {
  async loadWidgets(currentPage = 0, pageSize = 10): Promise<WidgetsResponse> {
    const response = await axiosInstance.get('/widgets');
    return response.data;
  }

  async getWidgetConfiguration<T>(widgetId: number): Promise<T> {
    const response = await axiosInstance.get(`/widgets/${widgetId}`, {
      params: {
        prop: 'configuration',
      },
    });
    return response.data.configuration as T;
  }

  async updateWidgetConfiguration<T>(
    widgetId: number,
    configuration: T
  ): Promise<void> {
    await axiosInstance.patch(`/widgets/${widgetId}`, { configuration });
  }
}

export const widgetsApi = new WidgetsApi();

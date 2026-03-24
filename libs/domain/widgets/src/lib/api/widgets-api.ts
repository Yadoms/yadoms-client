import { axiosInstance } from '@yadoms/shared';
import { WidgetsResponse } from '../model/WidgetsResponse';

class WidgetsApi {
  async loadWidgets(currentPage = 0, pageSize = 10): Promise<WidgetsResponse> {
    const response = await axiosInstance.get('/widgets');
    return response.data;
  }

  async getWidgetConfiguration(widgetId: number): Promise<object> {
    const response = await axiosInstance.get(`/widgets/${widgetId}`, {
      params: {
        prop: 'configuration',
      },
    });
    return response.data;
  }
}

export const widgetsApi = new WidgetsApi();

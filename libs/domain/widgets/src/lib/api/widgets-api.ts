import { axiosInstance } from '@yadoms/shared';
import { WidgetsResponse } from '../model/WidgetsResponse';

export interface WidgetDetails<T> {
  title: string;
  configuration: T;
}

class WidgetsApi {
  async loadWidgets(currentPage = 0, pageSize = 10): Promise<WidgetsResponse> {
    const response = await axiosInstance.get('/widgets');
    return response.data;
  }

  async getWidget<T>(widgetId: number): Promise<WidgetDetails<T>> {
    const response = await axiosInstance.get(`/widgets/${widgetId}`);
    return {
      title: response.data.title ?? '',
      configuration: response.data.configuration as T,
    };
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

  async updateWidget<T>(
    widgetId: number,
    widget: Partial<WidgetDetails<T>>
  ): Promise<void> {
    await axiosInstance.patch(`/widgets/${widgetId}`, widget);
  }
}

export const widgetsApi = new WidgetsApi();

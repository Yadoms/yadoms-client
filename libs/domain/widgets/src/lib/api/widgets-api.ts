import { axiosInstance } from '@yadoms/shared';
import { WidgetsResponse } from '../model/WidgetsResponse';
import type { WidgetEntity } from '../slices/widgets.slice';

export interface WidgetDetails<T> {
  title: string;
  configuration: T;
}

export interface NewWidget<T> extends WidgetDetails<T> {
  page: number;
  type: string;
  position: number;
}

class WidgetsApi {
  async loadWidgets(currentPage = 0, pageSize = 10): Promise<WidgetsResponse> {
    const response = await axiosInstance.get('/widgets');
    return response.data;
  }

  async getPageWidgets(pageId: number): Promise<WidgetEntity[]> {
    const response = await axiosInstance.get('/widgets', {
      params: { page: pageId },
    });
    if (response.status === 204) return [];

    // Server returns the widget itself when only one is found
    return response.data.widgets ?? [response.data];
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

  async createWidget<T>(widget: NewWidget<T>): Promise<void> {
    await axiosInstance.post('/widgets', {
      idPage: widget.page,
      type: widget.type,
      position: widget.position,
      title: widget.title,
      configuration: widget.configuration,
    });
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

  async updateWidgetPosition(widgetId: number, position: number) {
    await axiosInstance.patch(`/widgets/${widgetId}`, { position });
  }
}

export const widgetsApi = new WidgetsApi();

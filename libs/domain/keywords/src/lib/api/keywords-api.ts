import { axiosInstance, parseYadomsDate } from '@yadoms/shared';
import {
  KeywordsResponse,
  Acquisition,
  AcquisitionsResponse,
} from '../model/KeywordsResponse';

class KeywordsApi {
  async loadKeywords(
    currentPage?: number,
    pageSize?: number,
    capacityNames?: string[]
  ): Promise<KeywordsResponse> {
    try {
      const response = await axiosInstance.get<KeywordsResponse>(`/keywords`, {
        params: {
          page: currentPage,
          perPage: pageSize,
          'from-capacity-name': capacityNames?.length
            ? capacityNames.join('|')
            : undefined,
        },
      });
      if (response.status === 204) {
        return {
          keywords: [],
          paging: {
            currentPage: 1,
            totalPage: 1,
            pageSize: 0,
          },
        };
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching keywords : ', error);
      throw error;
    }
  }

  async sendCommand(keywordId: number, command: string) {
    try {
      await axiosInstance.post(
        '/keywords/' + keywordId + '/command/' + command
      );
    } catch (error) {
      console.error('Error starting/stoping plugin instance : ', error);
      throw error;
    }
  }

  async getFriendlyNames(keywordIds: number[]): Promise<Map<number, string>> {
    const friendlyNames = new Map<number, string>();
    if (keywordIds.length === 0) return friendlyNames;

    const response = await axiosInstance.get(
      `/keywords/${keywordIds.join('|')}`
    );
    if (response.status === 204) return friendlyNames;

    // Server returns the keyword itself when only one is requested
    const keywords: { id: number; friendlyName: string }[] = response.data
      .keywords ?? [response.data];
    for (const keyword of keywords) {
      friendlyNames.set(keyword.id, keyword.friendlyName);
    }
    return friendlyNames;
  }

  async getLatestAcquisitions(
    keywordIds: number[],
    limit = 1
  ): Promise<AcquisitionsResponse> {
    try {
      const ids = keywordIds.join('|');
      const response = await axiosInstance.get<AcquisitionsResponse>(
        `/keywords/${ids}/acquisitions`,
        {
          params: {
            limit,
          },
        }
      );

      // Adapt date format from API to Acquisition type
      console.debug('Raw acquisitions response from API : ', response.data);
      for (const item of response.data.acquisitions) {
        for (const acq of item.acquisitions) {
          if (typeof acq.date === 'string') {
            acq.date = parseYadomsDate(acq.date);
          }
        }
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching latest acquisitions:', error);
      throw error;
    }
  }

  async getLatestAcquisition(
    keywordId: number
  ): Promise<Acquisition | undefined> {
    const acquisitions = await keywordsApi.getLatestAcquisitions([keywordId]);
    const keywordAcquisitions = acquisitions.acquisitions.find(
      (item) => item.keywordId === keywordId
    );
    return keywordAcquisitions?.acquisitions[0] || undefined;
  }
}

export const keywordsApi = new KeywordsApi();

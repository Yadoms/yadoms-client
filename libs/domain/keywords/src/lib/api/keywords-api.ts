import { axiosInstance } from '@yadoms/shared';
import {
  KeywordsResponse,
  Acquisition,
  AcquisitionsResponse,
} from '../model/KeywordsResponse';

class KeywordsApi {
  async loadKeywords(
    currentPage = 0,
    pageSize = 10
  ): Promise<KeywordsResponse> {
    try {
      const response = await axiosInstance.get<KeywordsResponse>(`/keywords`, {
        params: {
          page: currentPage,
          perPage: pageSize,
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

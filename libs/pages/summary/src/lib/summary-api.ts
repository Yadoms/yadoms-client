import { axiosInstance } from '@yadoms/shared';

interface SystemInformationsResponse {
  platform: string;
  platformFamily: string;
  yadomsVersion: string;
  startupTime: string;
  executablePath: string;
  serverReady: boolean;
  database: {
    version: string;
    size: number;
  };
  databaseEngine: {
    type: string;
    version: string;
  };
  backupSupported: boolean;
  developerMode: boolean;
}

export async function loadSystemInformations(): Promise<SystemInformationsResponse> {
  try {
    const response = await axiosInstance.get<SystemInformationsResponse>(
      `/system/information`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching system information:', error);
    throw error;
  }
}

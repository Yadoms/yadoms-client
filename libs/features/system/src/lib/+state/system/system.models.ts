/**
 * Interface for the 'SystemInformation' data
 */
export interface SystemInformationEntity {
  platform: string;
  platformFamily: string;
  yadomsVersion: string;
  startupTime: Date;
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

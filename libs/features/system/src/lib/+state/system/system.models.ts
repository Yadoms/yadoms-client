import { SplitInterpolation } from "@angular/compiler";

/**
 * Interface for the 'System' data
 */
export interface SystemInformationEntity {
  id: string | number; // Primary ID // TODO virer ?

  platform: string;
  platformFamily: string;
  yadomsVersion: string;
  startupTime: Date;
  executablePath:string;
  serverReady: boolean;
  database: {
      version: string;
      size: number;
  },
  databaseEngine: {
      type: string;
      version:string;
  },
  backupSupported: boolean;
  developerMode:  boolean;
}

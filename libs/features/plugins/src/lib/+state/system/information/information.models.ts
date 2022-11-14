/**
 * Interface for the 'Information' data
 */
export interface SystemInformationEntity {
  runningPlatform: string;
  yadoms:
    | {
        version: string;
      }
    | undefined;
  startupTime: Date;
  executablePath: string;
  serverReady: boolean;
  developerMode?: boolean;
}

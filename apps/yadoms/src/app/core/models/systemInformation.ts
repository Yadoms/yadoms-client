
export class SystemInformation {
  public runningPlatform: string = "";
  public yadoms: {
    version: string;
  } | undefined;
  public startupTime: Date = new Date();
  public executablePath: string = "";
  public serverReady: boolean = false;
  public developerMode?: boolean;
}

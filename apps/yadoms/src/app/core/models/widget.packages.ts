export class WidgetPackage {
  public type: string = '';
  public version: string = '';
  public author: string = '';
  public credits: string = '';
  public icon: string = '';
  public url: string = '';
  public dependencies:
    | {
        yadoms: {
          minimumVersion: string;
        };
      }
    | undefined;
  public dimensions:
    | {
        min: {
          x: number;
          y: number;
        };
        max: {
          x: number;
          y: number;
        };
        default: {
          x: number;
          y: number;
        };
      }
    | undefined;
}

export class WidgetPackages {
  public package: WidgetPackage[] = [];
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiUrl = 'http://localhost:8080/rest/v2';

export const environment = {
  production: false,
  systemInformationUrl: `${apiUrl}/system/information`,
};

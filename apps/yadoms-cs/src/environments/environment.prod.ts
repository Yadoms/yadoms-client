const apiUrl = 'http://localhost:8080/rest/v2';

export const environment = {
  production: true,

  pluginsUrl: `${apiUrl}/plugins`,
  pluginsInstancesUrl: `${apiUrl}/plugins-instances`,

  devicesUrl: `${apiUrl}/devices`,

  informationUrl: `${apiUrl}/system/information`,
};

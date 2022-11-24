const PROXY_CONFIG = {
  '/rest/v2/*': {
    target: 'http://127.0.0.1:4200',
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    bypass: function (req, res, proxyOptions) {
      let isInMemory = true;
      console.log(req.url);
      switch (req.url.substring(0, req.url.indexOf('?'))) {
        case '/rest/v2/plugins':
          res.end(require('../mocks/plugins'));
          break;
        case '/rest/v2/plugins-instances':
          res.end(require('../mocks/plugins-instances'));
          break;
        case '/rest/v2/devices':
          res.end(require('../mocks/devices'));
          break;
        case '/rest/v2/system/information':
          res.end(require('../mocks/system/information'));
          break;
        default:
          isInMemory = null;
          break;
      }
      return isInMemory;
    },
  },
};

module.exports = PROXY_CONFIG;

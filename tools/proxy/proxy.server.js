const PROXY_CONFIG = {
  '/rest/v2/*': {
    target: 'http://127.0.0.1:8080',
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    bypass: function (req, res, proxyOptions) {
      let isInMemory = true;
      switch (req.url) {
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

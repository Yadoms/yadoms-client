const PROXY_CONFIG = {
  '/rest/v2/*': {
    target: 'http://127.0.0.1:4200',
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    bypass: function (req, res, proxyOptions) {
      let isInMemory = true;
      console.log(req.url);
      switch (req.url) {
        case '/rest/v2/plugins':
          res.end(require('../mocks/plugins'));
          break;
        case '/rest/v2/plugins-instances':
          res.end(require('../mocks/plugins-instances'));
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

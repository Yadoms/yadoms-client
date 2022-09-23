const express = require('express');
const yd = express();
const fs = require('fs');
const _ = require('lodash');

const router = express.Router({});
const bodyParser = require('body-parser');


router.use(bodyParser.json());


function generateSuccess(data) {
  return {
    result: true,
    data: data,
    message: ''
  };
}


function generateError(message, data) {
  return {
    result: false,
    data: data,
    message: message
  };
}

router.get('/system/information', function (req, res) {
  const result = {
    runningPlatform: 'Unknown platform (backend-mockup)',
    yadoms: {
      version: '1.2.3'
    },
    startupTime: '2018-11-13T23:03:14+00:00',
    executablePath: 'executable (backend-mockup)',
    serverReady: true,
    developerMode: true,
  };
  res.json(generateSuccess(result));
});

router.get('/page', function (req, res) {
  fs.readFile(__dirname + '/data/pages.json', 'utf-8', function (err, data) {
    res.json(generateSuccess(JSON.parse(data)));
  });
});

router.get('/page/:pageid', function (req, res) {
  fs.readFile(__dirname + '/data/pages.json', 'utf-8', function (err, data) {
    var d = JSON.parse(data);
    var result = _.find(d.page, ['id', req.params.pageid]);
    if (result) {
      res.json(generateSuccess(result));
    } else {
      res.json(generateError('Unknown page id=' + req.params.pageid));
    }
  });
});


router.get('/page/:pageid/widget', function (req, res) {
  fs.readFile(__dirname + '/data/widgets.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    d.widget = _.filter(d.widget, ['idPage', req.params.pageid]);
    res.json(generateSuccess(d));
  });
});


router.get('/widget/package', function (req, res) {
  fs.readFile(__dirname + '/data/widgets.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    res.json(generateSuccess(d.package));
  });
});


router.get('/widget', function (req, res) {
  fs.readFile(__dirname + '/data/widgets.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    res.json(generateSuccess(d));
  });
});


router.put('/plugin', function (req, res) {
  fs.readFile(__dirname + '/data/plugins.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    const result = {};
    result.plugins = d.plugins.map(plugin => {
      if (!req.body || !req.body.fields)
        return d.plugins;

      // Filter by field
      const pluginResult = {};
      for (let field of req.body.fields) {
        pluginResult[field] = plugin[field];
      }
      return pluginResult;
    });
    res.json(generateSuccess(result));
  });
});


router.get('/plugin/instance', function (req, res) {
  fs.readFile(__dirname + '/data/plugins.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    res.json(generateSuccess(d.instances));
  });
});


router.put('/plugin/:pluginInstanceId/start', function (req, res) {
  console.log("Plugin " + req.params.pluginInstanceId + " started");
  res.json(generateSuccess());
});
router.put('/plugin/:pluginInstanceId/stop', function (req, res) {
  console.log("Plugin " + req.params.pluginInstanceId + " stopped");
  res.json(generateSuccess());
});

const PluginInstanceState = Object.freeze({
  "Unknown": 0,
  "Error": 1,
  "Stopped": 2,
  "Running": 3,
  "Custom": 4,
  "WaitDebugger": 5
});

router.get('/plugin/instanceWithState', function (req, res) {
  fs.readFile(__dirname + '/data/plugins.json', 'utf-8', function (err, data) {
    const d = JSON.parse(data);
    let instancesWithState = [];
    for (let instance of d.instances) {
      let instanceWithState = {
        'instance': instance
      };
      instancesWithState.push(instanceWithState);
    }
    instancesWithState[0]['state'] = {state: PluginInstanceState.Running};
    instancesWithState[1]['state'] = {state: PluginInstanceState.Stopped};
    instancesWithState[2]['state'] = {
      state: PluginInstanceState.Custom,
      messageId: 'connecting',
      messageData: 'TODO à gérer'
    }
    instancesWithState[3]['state'] = {state: PluginInstanceState.Error};
    res.json(generateSuccess(instancesWithState));
  });
});


yd.use('/plugins/:plugintype/icon.png', function (req, res) {
  res.sendFile(__dirname + '/data/plugins/' + req.params.plugintype + '/icon.png');
});
yd.use('/rest', router);

const server = yd.listen(8080, function () {
  const host = server.address().address === '::' ? 'localhost' : server.address().address;
  const port = server.address().port;

  console.log('Yadoms Mockup Server started : http://%s:%s', host, port);
});

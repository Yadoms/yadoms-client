https://documenter.getpostman.com/view/1180104/UVJZndP4#41eac52b-c81d-4e05-974f-9abb8e142405

# les types existant dans la configurationSchema

https://github.com/Yadoms/yadoms/wiki/Configuration
yadoms\sources\www\js\objects\configuration\

# réponse pour la page de configuration des Plugins

queryParam "locale=fr"

```json
{
  "id": 6,
  "displayName": "LametricTime",
  "type": "LametricTime",
  "configuration": {
    "APIKey": "cb6860047451c15e28b4bad6a96f0dec5022d625233846909525a90b585b1483",
    "PairingMode": {
      "content": {
        "Automatic": {
          "content": {
            "Port": "Https"
          }
        },
        "Manual": {
          "content": {
            "IPAddress": "",
            "Port": "Https"
          }
        }
      },
      "activeSection": "Automatic",
      "activeSectionText": "Auto"
    }
  },
  "autoStart": true,
  "category": "User"
}
```

```json
{
  "id": 7,
  "displayName": "LametricTime",
  "type": "LametricTime",
  "configuration": {
    "APIKey": "cb6860047451c15e28b4bad6a96f0dec5022d625233846909525a90b585b1483",
    "PairingMode": {
      "content": {
        "Automatic": {
          "content": {
            "Port": "Https"
          }
        },
        "Manual": {
          "content": {
            "IPAddress": "123.12.12.1",
            "Port": "Https"
          }
        }
      },
      "activeSection": "Manual",
      "activeSectionText": "Manual"
    }
  },
  "autoStart": true,
  "category": "User"
}
```

```json
{
  "id": 8,
  "displayName": "linky",
  "type": "Linky",
  "configuration": {
    "SerialPort": "/dev/tty.Bluetooth-Incoming-Port",
    "EquipmentType": {
      "content": {
        "first": {
          "content": {}
        },
        "second": {
          "content": {
            "portEnabled": "AllInputsEnabled"
          }
        }
      },
      "activeSection": "first",
      "activeSectionText": "1xTIC"
    }
  },
  "autoStart": true,
  "category": "User"
}
```

```json
{
  "id": 9,
  "displayName": "Sigfox",
  "type": "Sigfox",
  "configuration": {
    "port": 8090,
    "advancedConfiguration": {
      "content": {
        "rssiMin": -150,
        "rssiMax": -100,
        "tensionMin": 2.4,
        "tensionMax": 3.6
      }
    }
  },
  "autoStart": true,
  "category": "User"
}
```

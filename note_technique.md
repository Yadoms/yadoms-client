https://documenter.getpostman.com/view/1180104/UVJZndP4#41eac52b-c81d-4e05-974f-9abb8e142405

# les types existant dans la configurationSchema

https://github.com/Yadoms/yadoms/wiki/Configuration
yadoms\sources\www\js\objects\configuration\

# réponse pour la page de configuration des Plugins

queryParam "locale=fr"

```json
{
  "type": "LametricTime",
  "version": "1.0.2",
  "author": "Oussama DAHMAZ",
  "url": "",
  "supportManuallyCreatedDevice": false,
  "supportDeviceRemovedNotification": false,
  "package": {
    "type": "LametricTime",
    "version": "1.0.2",
    "author": "Oussama DAHMAZ",
    "credits": "",
    "supportedPlatforms": "all",
    "dependencies": {
      "yadoms": {
        "minimumVersion": "2.4.0-beta.1"
      }
    },
    "configurationSchema": {
      "APIKey": {
        "type": "string",
        "required": "true",
        "regex": "[a-zA-Z0-9]{64}"
      },
      "PairingMode": {
        "type": "comboSection",
        "content": {
          "Automatic": {
            "name": "Auto",
            "type": "section",
            "content": {
              "Port": {
                "type": "enum",
                "values": {
                  "Http": "8080",
                  "Https": "4343"
                },
                "defaultValue": "Https"
              }
            }
          },
          "Manual": {
            "name": "Manual",
            "type": "section",
            "content": {
              "IPAddress": {
                "type": "string",
                "regex": "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$",
                "required": "true"
              },
              "Port": {
                "type": "enum",
                "values": {
                  "Http": "8080",
                  "Https": "4343"
                },
                "defaultValue": "Https"
              }
            }
          }
        }
      }
    }
  },
  "locales": {
    "name": "LametricTime",
    "description": "Support de l'équipement Lametric Time (voir [site web Lametric](https://lametric.com/en-US/time/overview), comment utiliser le [plugin LametricTime](https://github.com/Yadoms/yadoms/wiki/LametricTime))",
    "configurationSchema": {
      "APIKey": {
        "name": "Clé d'API",
        "description": "Cette clé est nécessaire pour le fonctionnement de votre plugin. Elle peut être obtenue sur simple inscription (gratuite) au [Lametric](https://developer.lametric.com/user/devices).",
        "regexErrorMessage": "Ce n'est pas une API KEY valide"
      },
      "PairingMode": {
        "name": "Mode d'appairage",
        "type": "comboSection",
        "content": {
          "Automatic": {
            "name": "Appairage automatique",
            "description": "Appairage automatique en utilisant le protocole UPNP",
            "content": {
              "Port": {
                "name": "Port",
                "description": "Le port de communication de Lametric (exemple Http: 8080, Https: 4343)"
              }
            }
          },
          "Manual": {
            "name": "Appairage manuel",
            "description": "Appairage manuel",
            "content": {
              "IPAddress": {
                "name": "Adresse IP",
                "description": "L'adresse IP du module",
                "regexErrorMessage": "Ce n'est pas une adresse IP valide"
              },
              "Port": {
                "name": "Port",
                "description": "Le port de communication de Lametric (exemple Http: 8080, Https: 4343)"
              }
            }
          }
        }
      }
    },
    "customLabels": {
      "pluginState": {
        "failedToConnect": "La connexion a échoué...",
        "initializationError": "Erreur d'initialisation"
      }
    }
  }
}
```

const plugins = JSON.stringify({
  plugins: [
    {
      type: 'LametricTime',
      version: '1.0.2',
      author: 'Oussama DAHMAZ',
      url: '',
      'supportManuallyCreatedDevice': false,
      'supportDeviceRemovedNotification': false,
      package: {
        type: 'LametricTime',
        version: '1.0.2',
        author: 'Oussama DAHMAZ',
        credits: '',
        supportedPlatforms: 'all',
        dependencies: {
          yadoms: {
            minimumVersion: '2.4.0-beta.1',
          },
        },
        configurationSchema: {
          APIKey: {
            type: 'string',
            required: 'true',
            regex: '[a-zA-Z0-9]{64}',
          },
          PairingMode: {
            type: 'comboSection',
            content: {
              Automatic: {
                name: 'Auto',
                type: 'section',
                content: {
                  Port: {
                    type: 'enum',
                    values: {
                      Http: '8080',
                      Https: '4343',
                    },
                    defaultValue: 'Https',
                  },
                },
              },
              Manual: {
                name: 'Manual',
                type: 'section',
                content: {
                  IPAddress: {
                    type: 'string',
                    regex: '^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$',
                    required: 'true',
                  },
                  Port: {
                    type: 'enum',
                    values: {
                      Http: '8080',
                      Https: '4343',
                    },
                    defaultValue: 'Https',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      type: 'SystemInformation',
      version: '1.2.0',
      author: 'Jean-Michel BERHAULT',
      url: 'https://github.com/Yadoms/yadoms/wiki/SystemInformation',
      'supportManuallyCreatedDevice': false,
      'supportDeviceRemovedNotification': false,
      package: {
        type: 'SystemInformation',
        version: '1.2.0',
        author: 'Jean-Michel BERHAULT',
        url: 'https://github.com/Yadoms/yadoms/wiki/SystemInformation',
        credits: '',
        supportedPlatforms: 'all',
        dependencies: {
          yadoms: {
            minimumVersion: '2.3.0-beta.1',
          },
        },
        configurationSchema: {},
      },
    },
    {
      type: 'enOcean',
      version: '2.1.0',
      author: 'Sébastien Gallou',
      url: 'https://github.com/Yadoms/yadoms/wiki/EnOcean',
      'supportManuallyCreatedDevice': false,
      'supportDeviceRemovedNotification': true,
      package: {
        type: 'enOcean',
        version: '2.1.0',
        author: 'Sébastien Gallou',
        url: 'https://github.com/Yadoms/yadoms/wiki/EnOcean',
        credits: '',
        supportedPlatforms: 'all',
        dependencies: {
          yadoms: {
            minimumVersion: '2.3.0-beta.1',
          },
        },
        configurationSchema: {
          SerialPort: {
            type: 'enum',
            values: {
              __Binding__: {
                type: 'system',
                query: 'serialPorts',
              },
            },
          },
          PairingMode: {
            type: 'enum',
            values: {
              auto: 'Automatic pairing mode',
              manual: 'Manual pairing mode',
            },
          },
        },
        supportDeviceRemovedNotification: 'true',
        deviceConfiguration: {
          staticConfigurationSchema: {
            schemas: {
              all: {
                types: {
                  '*': {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  manufacturer: {
                    type: 'string',
                  },
                  profile: {
                    type: 'comboSection',
                    content: {
                      'A5-02-01': {
                        name: 'A5-02-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-02': {
                        name: 'A5-02-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-03': {
                        name: 'A5-02-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-04': {
                        name: 'A5-02-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-05': {
                        name: 'A5-02-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-06': {
                        name: 'A5-02-06',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-07': {
                        name: 'A5-02-07',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-08': {
                        name: 'A5-02-08',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-09': {
                        name: 'A5-02-09',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-0A': {
                        name: 'A5-02-0A',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-0B': {
                        name: 'A5-02-0B',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-10': {
                        name: 'A5-02-10',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-11': {
                        name: 'A5-02-11',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-12': {
                        name: 'A5-02-12',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-13': {
                        name: 'A5-02-13',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-14': {
                        name: 'A5-02-14',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-15': {
                        name: 'A5-02-15',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-16': {
                        name: 'A5-02-16',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-17': {
                        name: 'A5-02-17',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-18': {
                        name: 'A5-02-18',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-19': {
                        name: 'A5-02-19',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-1A': {
                        name: 'A5-02-1A',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-1B': {
                        name: 'A5-02-1B',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-20': {
                        name: 'A5-02-20',
                        type: 'section',
                        content: '',
                      },
                      'A5-02-30': {
                        name: 'A5-02-30',
                        type: 'section',
                        content: '',
                      },
                      'A5-04-01': {
                        name: 'A5-04-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-04-02': {
                        name: 'A5-04-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-04-03': {
                        name: 'A5-04-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-04-04': {
                        name: 'A5-04-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-05-01': {
                        name: 'A5-05-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-06-01': {
                        name: 'A5-06-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-06-02': {
                        name: 'A5-06-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-06-03': {
                        name: 'A5-06-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-06-04': {
                        name: 'A5-06-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-06-05': {
                        name: 'A5-06-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-07-01': {
                        name: 'A5-07-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-07-02': {
                        name: 'A5-07-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-07-03': {
                        name: 'A5-07-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-08-01': {
                        name: 'A5-08-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-08-02': {
                        name: 'A5-08-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-08-03': {
                        name: 'A5-08-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-02': {
                        name: 'A5-09-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-04': {
                        name: 'A5-09-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-05': {
                        name: 'A5-09-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-06': {
                        name: 'A5-09-06',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-07': {
                        name: 'A5-09-07',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-08': {
                        name: 'A5-09-08',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-09': {
                        name: 'A5-09-09',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-0A': {
                        name: 'A5-09-0A',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-0B': {
                        name: 'A5-09-0B',
                        type: 'section',
                        content: '',
                      },
                      'A5-09-0C': {
                        name: 'A5-09-0C',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-01': {
                        name: 'A5-10-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-02': {
                        name: 'A5-10-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-03': {
                        name: 'A5-10-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-04': {
                        name: 'A5-10-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-05': {
                        name: 'A5-10-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-06': {
                        name: 'A5-10-06',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-07': {
                        name: 'A5-10-07',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-08': {
                        name: 'A5-10-08',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-09': {
                        name: 'A5-10-09',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-0A': {
                        name: 'A5-10-0A',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-0B': {
                        name: 'A5-10-0B',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-0C': {
                        name: 'A5-10-0C',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-0D': {
                        name: 'A5-10-0D',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-10': {
                        name: 'A5-10-10',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-11': {
                        name: 'A5-10-11',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-12': {
                        name: 'A5-10-12',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-13': {
                        name: 'A5-10-13',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-14': {
                        name: 'A5-10-14',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-15': {
                        name: 'A5-10-15',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-16': {
                        name: 'A5-10-16',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-17': {
                        name: 'A5-10-17',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-18': {
                        name: 'A5-10-18',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-19': {
                        name: 'A5-10-19',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1A': {
                        name: 'A5-10-1A',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1B': {
                        name: 'A5-10-1B',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1C': {
                        name: 'A5-10-1C',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1D': {
                        name: 'A5-10-1D',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1E': {
                        name: 'A5-10-1E',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-1F': {
                        name: 'A5-10-1F',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-20': {
                        name: 'A5-10-20',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-21': {
                        name: 'A5-10-21',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-22': {
                        name: 'A5-10-22',
                        type: 'section',
                        content: '',
                      },
                      'A5-10-23': {
                        name: 'A5-10-23',
                        type: 'section',
                        content: '',
                      },
                      'A5-11-01': {
                        name: 'A5-11-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-11-02': {
                        name: 'A5-11-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-11-03': {
                        name: 'A5-11-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-11-04': {
                        name: 'A5-11-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-11-05': {
                        name: 'A5-11-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-00': {
                        name: 'A5-12-00',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-01': {
                        name: 'A5-12-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-02': {
                        name: 'A5-12-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-03': {
                        name: 'A5-12-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-04': {
                        name: 'A5-12-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-05': {
                        name: 'A5-12-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-12-10': {
                        name: 'A5-12-10',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-01': {
                        name: 'A5-13-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-02': {
                        name: 'A5-13-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-03': {
                        name: 'A5-13-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-04': {
                        name: 'A5-13-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-05': {
                        name: 'A5-13-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-06': {
                        name: 'A5-13-06',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-07': {
                        name: 'A5-13-07',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-08': {
                        name: 'A5-13-08',
                        type: 'section',
                        content: '',
                      },
                      'A5-13-10': {
                        name: 'A5-13-10',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-01': {
                        name: 'A5-14-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-02': {
                        name: 'A5-14-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-03': {
                        name: 'A5-14-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-04': {
                        name: 'A5-14-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-05': {
                        name: 'A5-14-05',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-06': {
                        name: 'A5-14-06',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-07': {
                        name: 'A5-14-07',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-08': {
                        name: 'A5-14-08',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-09': {
                        name: 'A5-14-09',
                        type: 'section',
                        content: '',
                      },
                      'A5-14-0A': {
                        name: 'A5-14-0A',
                        type: 'section',
                        content: '',
                      },
                      'A5-20-01': {
                        name: 'A5-20-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-20-12': {
                        name: 'A5-20-12',
                        type: 'section',
                        content: '',
                      },
                      'A5-30-01': {
                        name: 'A5-30-01',
                        type: 'section',
                        content: '',
                      },
                      'A5-30-02': {
                        name: 'A5-30-02',
                        type: 'section',
                        content: '',
                      },
                      'A5-30-03': {
                        name: 'A5-30-03',
                        type: 'section',
                        content: '',
                      },
                      'A5-30-04': {
                        name: 'A5-30-04',
                        type: 'section',
                        content: '',
                      },
                      'A5-30-05': {
                        name: 'A5-30-05',
                        type: 'section',
                        content: '',
                      },
                      'D2-00-01': {
                        name: 'D2-00-01',
                        type: 'section',
                        content: {
                          setPointEnable: {
                            name: 'Enable set point',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'false',
                            content: {
                              setPointRangeLimit: {
                                name: 'Set point range limit',
                                type: 'decimal',
                                minimumValue: '0.1',
                                maximumValue: '12.7',
                                precision: '1',
                                defaultValue: '12.7',
                              },
                              setPointSteps: {
                                name: 'Number of set point steps',
                                type: 'int',
                                minimumValue: '1',
                                maximumValue: '127',
                                defaultValue: '127',
                              },
                            },
                          },
                          temperatureMeasurementEnable: {
                            name: 'Enable temperature measurement',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'true',
                            content: {
                              measureInterval: {
                                name: 'Measure interval (s)',
                                type: 'int',
                                minimumValue: '10',
                                maximumValue: '600',
                                defaultValue: '600',
                              },
                              significantDelta: {
                                name: 'Significant delta (°)',
                                type: 'decimal',
                                minimumValue: '0.0',
                                maximumValue: '3.0',
                                defaultValue: '0.2',
                                precision: '1',
                              },
                              keepAliveTiming: {
                                name: 'Number of measurements between 2 keep alive messages',
                                type: 'int',
                                minimumValue: '10',
                                maximumValue: '70',
                                defaultValue: '30',
                              },
                            },
                          },
                        },
                      },
                      'D2-01-00': {
                        name: 'D2-01-00',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-01': {
                        name: 'D2-01-01',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-02': {
                        name: 'D2-01-02',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-03': {
                        name: 'D2-01-03',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-04': {
                        name: 'D2-01-04',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          dimTimer1: {
                            name: 'Dim timer 1',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '1.5',
                          },
                          dimTimer2: {
                            name: 'Dim timer 2',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '3',
                          },
                          dimTimer3: {
                            name: 'Dim timer 3',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '6',
                          },
                        },
                      },
                      'D2-01-05': {
                        name: 'D2-01-05',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          dimTimer1: {
                            name: 'Dim timer 1',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '1.5',
                          },
                          dimTimer2: {
                            name: 'Dim timer 2',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '3',
                          },
                          dimTimer3: {
                            name: 'Dim timer 3',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '6',
                          },
                        },
                      },
                      'D2-01-06': {
                        name: 'D2-01-06',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-07': {
                        name: 'D2-01-07',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-08': {
                        name: 'D2-01-08',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          minEnergyMeasureRefreshTime: {
                            name: 'Minimum refresh time',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '30',
                          },
                          maxEnergyMeasureRefreshTime: {
                            name: 'Maximum refresh time',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            defaultValue: '600',
                          },
                        },
                      },
                      'D2-01-09': {
                        name: 'D2-01-09',
                        type: 'section',
                        content: {
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          dimTimer1: {
                            name: 'Dim timer 1',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '1.5',
                          },
                          dimTimer2: {
                            name: 'Dim timer 2',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '3',
                          },
                          dimTimer3: {
                            name: 'Dim timer 3',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '7.5',
                            precision: '1',
                            defaultValue: '6',
                          },
                          minEnergyMeasureRefreshTime: {
                            name: 'Minimum refresh time',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '30',
                          },
                          maxEnergyMeasureRefreshTime: {
                            name: 'Maximum refresh time',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            defaultValue: '600',
                          },
                        },
                      },
                      'D2-01-0A': {
                        name: 'D2-01-0A',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          powerFailureDetection: {
                            name: 'Power failure detection',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'disable',
                          },
                        },
                      },
                      'D2-01-0B': {
                        name: 'D2-01-0B',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          powerFailureDetection: {
                            name: 'Power failure detection',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'disable',
                          },
                          minEnergyMeasureRefreshTime: {
                            name: 'Minimum refresh time',
                            type: 'int',
                            minimumValue: '1',
                            maximumValue: '255',
                            defaultValue: '30',
                          },
                          maxEnergyMeasureRefreshTime: {
                            name: 'Maximum refresh time',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            defaultValue: '600',
                          },
                        },
                      },
                      'D2-01-0C': {
                        name: 'D2-01-0C',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          minEnergyMeasureRefreshTime: {
                            name: 'Minimum refresh time',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '30',
                          },
                          maxEnergyMeasureRefreshTime: {
                            name: 'Maximum refresh time',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            defaultValue: '600',
                          },
                        },
                      },
                      'D2-01-0D': {
                        name: 'D2-01-0D',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                        },
                      },
                      'D2-01-0E': {
                        name: 'D2-01-0E',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          minEnergyMeasureRefreshTime: {
                            name: 'Minimum refresh time',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '30',
                          },
                          maxEnergyMeasureRefreshTime: {
                            name: 'Maximum refresh time',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            defaultValue: '600',
                          },
                        },
                      },
                      'D2-01-0F': {
                        name: 'D2-01-0F',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          connectedSwitchsType: {
                            name: 'Connected switchs type',
                            type: 'enum',
                            values: {
                              externalSwitch: 'Switch',
                              externalPushButton: 'Push button',
                              autodetection: 'Autodetect',
                            },
                            defaultValue: 'autodetection',
                          },
                          switchingState: {
                            name: 'Switching behaviour',
                            type: 'enum',
                            values: {
                              tooggle: 'Each change on switch toogles output',
                              specific: 'Specific ON/OFF positions',
                            },
                          },
                          autoOffTimer: {
                            name: 'Auto off timer',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'false',
                            content: {
                              value: {
                                name: 'value',
                                type: 'decimal',
                                minimumValue: '0.1',
                                maximumValue: '6553.4',
                                defaultValue: '60',
                              },
                            },
                          },
                          delayOffTimer: {
                            name: 'Delay off timer',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'false',
                            content: {
                              value: {
                                name: 'value',
                                type: 'decimal',
                                minimumValue: '0.1',
                                maximumValue: '6553.4',
                                defaultValue: '60',
                              },
                            },
                          },
                        },
                      },
                      'D2-01-10': {
                        name: 'D2-01-10',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-11': {
                        name: 'D2-01-11',
                        type: 'section',
                        content: '',
                      },
                      'D2-01-12': {
                        name: 'D2-01-12',
                        type: 'section',
                        content: {
                          localControl: {
                            name: 'Local control',
                            type: 'enum',
                            values: {
                              enable: 'enable',
                              disable: 'disable',
                            },
                            defaultValue: 'enable',
                          },
                          taughtIn: {
                            name: 'Taught In',
                            type: 'enum',
                            values: {
                              allDevices: 'All devices',
                              yadomsOnly: 'Yadoms only',
                            },
                            defaultValue: 'allDevices',
                          },
                          userInterfaceMode: {
                            name: 'User Interface Mode',
                            type: 'enum',
                            values: {
                              dayMode: 'Day (led on)',
                              nightMode: 'Night (led off)',
                            },
                            defaultValue: 'dayMode',
                          },
                          defaultState: {
                            name: 'Default state',
                            type: 'enum',
                            values: {
                              off: 'Off',
                              on: 'On',
                              previousState: 'Previous state',
                              notUsed: 'Not Used',
                            },
                            defaultValue: 'off',
                          },
                          connectedSwitchsType: {
                            name: 'Connected switchs type',
                            type: 'enum',
                            values: {
                              externalSwitch: 'Switch',
                              externalPushButton: 'Push button',
                              autodetection: 'Autodetect',
                            },
                            defaultValue: 'autodetection',
                          },
                          switchingState: {
                            name: 'Switching behaviour',
                            type: 'enum',
                            values: {
                              tooggle: 'Each change on switch toogles output',
                              specific: 'Specific ON/OFF positions',
                            },
                          },
                          autoOffTimer: {
                            name: 'Auto off timer',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'false',
                            content: {
                              value: {
                                name: 'value',
                                type: 'decimal',
                                minimumValue: '0.1',
                                maximumValue: '6553.4',
                                defaultValue: '60',
                              },
                            },
                          },
                          delayOffTimer: {
                            name: 'Delay off timer',
                            type: 'section',
                            enableWithCheckBox: 'true',
                            enableWithCheckBoxDefaultValue: 'false',
                            content: {
                              value: {
                                name: 'value',
                                type: 'decimal',
                                minimumValue: '0.1',
                                maximumValue: '6553.4',
                                defaultValue: '60',
                              },
                            },
                          },
                        },
                      },
                      'D2-02-00': {
                        name: 'D2-02-00',
                        type: 'section',
                        content: {
                          deltaTemperatureToReport: {
                            name: 'Delta temperature to report',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '10.0',
                            precision: '1',
                            defaultValue: '0.5',
                          },
                          deltaIlluminationToReport: {
                            name: 'Delta illumination to report',
                            type: 'int',
                            minimumValue: '0.0',
                            maximumValue: '100.0',
                            defaultValue: '20',
                          },
                          maxMessagesInterval: {
                            name: 'Max interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            precision: '10',
                            defaultValue: '10',
                          },
                          minMessagesInterval: {
                            name: 'Min interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '10',
                          },
                        },
                      },
                      'D2-02-01': {
                        name: 'D2-02-01',
                        type: 'section',
                        content: {
                          deltaTemperatureToReport: {
                            name: 'Delta temperature to report',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '10.0',
                            precision: '1',
                            defaultValue: '0.5',
                          },
                          deltaIlluminationToReport: {
                            name: 'Delta illumination to report',
                            type: 'int',
                            minimumValue: '0.0',
                            maximumValue: '100.0',
                            defaultValue: '20',
                          },
                          maxMessagesInterval: {
                            name: 'Max interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            precision: '10',
                            defaultValue: '10',
                          },
                          minMessagesInterval: {
                            name: 'Min interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '10',
                          },
                        },
                      },
                      'D2-02-02': {
                        name: 'D2-02-02',
                        type: 'section',
                        content: {
                          deltaTemperatureToReport: {
                            name: 'Delta temperature to report',
                            type: 'decimal',
                            minimumValue: '0.0',
                            maximumValue: '10.0',
                            precision: '1',
                            defaultValue: '0.5',
                          },
                          maxMessagesInterval: {
                            name: 'Max interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2550',
                            precision: '10',
                            defaultValue: '10',
                          },
                          minMessagesInterval: {
                            name: 'Min interval between 2 messages (s)',
                            type: 'int',
                            minimumValue: '0',
                            maximumValue: '255',
                            defaultValue: '10',
                          },
                        },
                      },
                      'D2-03-0A': {
                        name: 'D2-03-0A',
                        type: 'section',
                        content: '',
                      },
                      'D2-03-20': {
                        name: 'D2-03-20',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-00': {
                        name: 'D2-04-00',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-01': {
                        name: 'D2-04-01',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-02': {
                        name: 'D2-04-02',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-03': {
                        name: 'D2-04-03',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-04': {
                        name: 'D2-04-04',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-05': {
                        name: 'D2-04-05',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-06': {
                        name: 'D2-04-06',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-07': {
                        name: 'D2-04-07',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-08': {
                        name: 'D2-04-08',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-09': {
                        name: 'D2-04-09',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-10': {
                        name: 'D2-04-10',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-1A': {
                        name: 'D2-04-1A',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-1B': {
                        name: 'D2-04-1B',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-1C': {
                        name: 'D2-04-1C',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-1D': {
                        name: 'D2-04-1D',
                        type: 'section',
                        content: '',
                      },
                      'D2-04-1E': {
                        name: 'D2-04-1E',
                        type: 'section',
                        content: '',
                      },
                      'D2-05-00': {
                        name: 'D2-05-00',
                        type: 'section',
                        content: {
                          measuredDurationOfVerticalRunMs: {
                            name: 'Mesured duration of a vertical run (ms)',
                            type: 'int',
                            minimumValue: '5000',
                            maximumValue: '300000',
                            precision: '10',
                            defaultValue: '15000',
                          },
                          measuredDurationOfRotationMs: {
                            name: 'Mesured duration of a rotation (ms)',
                            type: 'int',
                            minimumValue: '10',
                            maximumValue: '2540',
                            precision: '10',
                            defaultValue: '1500',
                          },
                          alarmAction: {
                            name: 'Alarm action',
                            type: 'enum',
                            values: {
                              noAction: 'No action',
                              immediateStop: 'Immediate stop',
                              goUp: 'Go Up',
                              goDown: 'Go Down',
                            },
                            defaultValue: 'noAction',
                          },
                        },
                      },
                      'D2-0A-00': {
                        name: 'D2-0A-00',
                        type: 'section',
                        content: '',
                      },
                      'D2-0A-01': {
                        name: 'D2-0A-01',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-01': {
                        name: 'D2-14-01',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-0D': {
                        name: 'D2-14-0D',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-0E': {
                        name: 'D2-14-0E',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-10': {
                        name: 'D2-14-10',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-1A': {
                        name: 'D2-14-1A',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-1B': {
                        name: 'D2-14-1B',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-1C': {
                        name: 'D2-14-1C',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-1D': {
                        name: 'D2-14-1D',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-20': {
                        name: 'D2-14-20',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-21': {
                        name: 'D2-14-21',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-22': {
                        name: 'D2-14-22',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-23': {
                        name: 'D2-14-23',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-24': {
                        name: 'D2-14-24',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-30': {
                        name: 'D2-14-30',
                        type: 'section',
                        content: '',
                      },
                      'D2-14-31': {
                        name: 'D2-14-31',
                        type: 'section',
                        content: '',
                      },
                      'D2-32-00': {
                        name: 'D2-32-00',
                        type: 'section',
                        content: '',
                      },
                      'D2-32-01': {
                        name: 'D2-32-01',
                        type: 'section',
                        content: '',
                      },
                      'D2-32-02': {
                        name: 'D2-32-02',
                        type: 'section',
                        content: '',
                      },
                      'D2-40-00': {
                        name: 'D2-40-00',
                        type: 'section',
                        content: '',
                      },
                      'D2-40-01': {
                        name: 'D2-40-01',
                        type: 'section',
                        content: '',
                      },
                      'D5-00-01': {
                        name: 'D5-00-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-01-01': {
                        name: 'F6-01-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-02-01': {
                        name: 'F6-02-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-02-02': {
                        name: 'F6-02-02',
                        type: 'section',
                        content: '',
                      },
                      'F6-02-03': {
                        name: 'F6-02-03',
                        type: 'section',
                        content: '',
                      },
                      'F6-02-04': {
                        name: 'F6-02-04',
                        type: 'section',
                        content: '',
                      },
                      'F6-03-01': {
                        name: 'F6-03-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-03-02': {
                        name: 'F6-03-02',
                        type: 'section',
                        content: '',
                      },
                      'F6-04-01': {
                        name: 'F6-04-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-04-02': {
                        name: 'F6-04-02',
                        type: 'section',
                        content: '',
                      },
                      'F6-05-00': {
                        name: 'F6-05-00',
                        type: 'section',
                        content: '',
                      },
                      'F6-05-01': {
                        name: 'F6-05-01',
                        type: 'section',
                        content: '',
                      },
                      'F6-05-02': {
                        name: 'F6-05-02',
                        type: 'section',
                        content: '',
                      },
                      'F6-10-00': {
                        name: 'F6-10-00',
                        type: 'section',
                        content: '',
                      },
                      'F6-10-01': {
                        name: 'F6-10-01',
                        type: 'section',
                        content: '',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        extraQueries: {
          pairing: {
            iconClass: 'fa fa-handshake-o',
          },
        },
      },
    },
    {
      type: 'rfxcom',
      version: '1.3.1',
      author: 'Sébastien GALLOU',
      url: 'https://github.com/Yadoms/yadoms/wiki/Rfxcom',
      'supportManuallyCreatedDevice': true,
      'supportDeviceRemovedNotification': false,
      package: {
        type: 'rfxcom',
        version: '1.3.1',
        author: 'Sébastien GALLOU',
        url: 'https://github.com/Yadoms/yadoms/wiki/Rfxcom',
        credits: '',
        supportedPlatforms: 'all',
        dependencies: {
          yadoms: {
            minimumVersion: '2.3.0-beta.4',
          },
        },
        configurationSchema: {
          SerialPort: {
            type: 'enum',
            values: {
              __Binding__: {
                type: 'system',
                query: 'serialPorts',
              },
            },
          },
          PairingMode: {
            type: 'enum',
            values: {
              auto: 'Automatic pairing mode',
              manual: 'Manual pairing mode',
            },
          },
          Protocols: {
            type: 'section',
            enableWithCheckBox: 'false',
            enableWithCheckBoxDefaultValue: 'false',
            content: {
              'AE Blyss': {
                type: 'bool',
                defaultValue: 'false',
              },
              Rubicson: {
                type: 'bool',
                defaultValue: 'false',
              },
              'FineOffset/Viking': {
                type: 'bool',
                defaultValue: 'false',
              },
              Lighting4: {
                type: 'bool',
                defaultValue: 'false',
              },
              RSL: {
                type: 'bool',
                defaultValue: 'false',
              },
              'Byron SX': {
                type: 'bool',
                defaultValue: 'false',
              },
              Imagintronix: {
                type: 'bool',
                defaultValue: 'false',
              },
              'undecoded messages': {
                type: 'bool',
                defaultValue: 'false',
              },
              Mertik: {
                type: 'bool',
                defaultValue: 'false',
              },
              'AD LightwaveRF': {
                type: 'bool',
                defaultValue: 'false',
              },
              'Hideki/UPM': {
                type: 'bool',
                defaultValue: 'true',
              },
              'La Crosse': {
                type: 'bool',
                defaultValue: 'true',
              },
              LegrandCAD: {
                type: 'bool',
                defaultValue: 'false',
              },
              BlindsT0: {
                type: 'bool',
                defaultValue: 'false',
              },
              BlindsT1: {
                type: 'bool',
                defaultValue: 'false',
              },
              X10: {
                type: 'bool',
                defaultValue: 'true',
              },
              ARC: {
                type: 'bool',
                defaultValue: 'true',
              },
              AC: {
                type: 'bool',
                defaultValue: 'true',
              },
              'HomeEasy EU': {
                type: 'bool',
                defaultValue: 'true',
              },
              Meiantech: {
                type: 'bool',
                defaultValue: 'false',
              },
              'Oregon Scientific': {
                type: 'bool',
                defaultValue: 'true',
              },
              ATI: {
                type: 'bool',
                defaultValue: 'false',
              },
              Visonic: {
                type: 'bool',
                defaultValue: 'false',
              },
              KeeLoq: {
                type: 'bool',
                defaultValue: 'false',
              },
              HomeConfort: {
                type: 'bool',
                defaultValue: 'false',
              },
              MCZ: {
                type: 'bool',
                defaultValue: 'false',
              },
              Funkbus: {
                type: 'bool',
                defaultValue: 'false',
              },
            },
          },
        },
        supportManuallyDeviceCreation: 'true',
        deviceConfiguration: {
          staticConfigurationSchema: {
            schemas: {
              'hcA_P-uc1_16': {
                types: {
                  x10: {
                    canBeCreatedManually: 'true',
                  },
                  ARC: {
                    canBeCreatedManually: 'true',
                  },
                  ab400d: {
                    canBeCreatedManually: 'true',
                  },
                  waveman: {
                    canBeCreatedManually: 'true',
                  },
                  emw200: {
                    canBeCreatedManually: 'true',
                  },
                  impuls: {
                    canBeCreatedManually: 'true',
                  },
                  risingSun: {
                    canBeCreatedManually: 'true',
                  },
                  philips: {
                    canBeCreatedManually: 'true',
                  },
                  energenie: {
                    canBeCreatedManually: 'true',
                  },
                  energenie5: {
                    canBeCreatedManually: 'true',
                  },
                  harrisonCurtain: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[A-P]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16',
                  },
                },
              },
              'hcA_D-uc1_4': {
                types: {
                  gdr2: {
                    canBeCreatedManually: 'true',
                  },
                  hqCoco20: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[A-D]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4',
                  },
                },
              },
              'hcA_D-uc1_3': {
                types: {
                  oase: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[A-D]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '3',
                  },
                },
              },
              'id1_67108863-unitCode1_16': {
                types: {
                  smartwares: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '67108863',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16',
                  },
                },
              },
              'id1_67108863-unitCode1_16-onOffOrDimmable': {
                types: {
                  AC: {
                    canBeCreatedManually: 'true',
                  },
                  homeEasyEU: {
                    canBeCreatedManually: 'true',
                  },
                  anslut: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '67108863',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16',
                  },
                  type: {
                    type: 'enum',
                    values: {
                      onOff: 'on-off type (switch, light...)',
                      dimmable: 'dimmable type (light dimmer...)',
                    },
                  },
                },
              },
              'id1_16777215-unitCode1_5': {
                types: {
                  kambrookRf3672: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[A-D]',
                    defaultValue: 'A',
                  },
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16777215',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '5',
                  },
                },
              },
              'id1_16777215-unitCode1_6': {
                types: {
                  sunperyBtx: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16777215',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '6',
                  },
                },
              },
              'id1_16777215-unitCode1_15': {
                types: {
                  aOkAc114: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16777215',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '15',
                  },
                },
              },
              's0_16-c0_1023': {
                types: {
                  koppla: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  system: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '16',
                  },
                  channel: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '1023',
                  },
                },
              },
              id0_16777215: {
                types: {
                  pt2262: {
                    canBeCreatedManually: 'true',
                  },
                  mcz1PelletStove: {
                    canBeCreatedManually: 'true',
                  },
                  mcz2PelletStove: {
                    canBeCreatedManually: 'true',
                  },
                  mcz3PelletStove: {
                    canBeCreatedManually: 'true',
                  },
                  meiantech: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '16777215',
                  },
                },
              },
              'id1_16777215-unitCode1_16': {
                types: {
                  lightwaveRf: {
                    canBeCreatedManually: 'true',
                  },
                  rsl: {
                    canBeCreatedManually: 'true',
                  },
                  hualite: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16777215',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16',
                  },
                },
              },
              'id1_16383-unitCode1_4': {
                types: {
                  emw100: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16383',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4',
                  },
                },
              },
              'id1_524287-unitCode1_6': {
                types: {
                  bbsb: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '524287',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '6',
                  },
                },
              },
              id0_16: {
                types: {
                  lucciAir: {
                    canBeCreatedManually: 'true',
                  },
                  westinghouse7226640: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '16',
                  },
                },
              },
              id0_255: {
                types: {
                  byronSx: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '255',
                  },
                },
              },
              id0_1023: {
                types: {
                  selectPlus: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '1023',
                  },
                },
              },
              id0_65535: {
                types: {
                  byronMp001: {
                    canBeCreatedManually: 'true',
                  },
                  envivo: {
                    canBeCreatedManually: 'true',
                  },
                  x10SecurityRemote: {
                    canBeCreatedManually: 'true',
                  },
                  digimax: {
                    canBeCreatedManually: 'true',
                  },
                  digimaxShort: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '65535',
                  },
                },
              },
              id1_65535: {
                types: {
                  mdRemote106: {
                    canBeCreatedManually: 'true',
                  },
                  livolo: {
                    canBeCreatedManually: 'true',
                  },
                  aoke: {
                    canBeCreatedManually: 'true',
                  },
                  rgb432w: {
                    canBeCreatedManually: 'true',
                  },
                  mdremote107: {
                    canBeCreatedManually: 'true',
                  },
                  legrandCad: {
                    canBeCreatedManually: 'true',
                  },
                  it: {
                    canBeCreatedManually: 'true',
                  },
                  mdRemote108: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '65535',
                  },
                },
              },
              id1_1048575: {
                types: {
                  avantek: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '1048575',
                  },
                },
              },
              id1_16777215: {
                types: {
                  trc02: {
                    canBeCreatedManually: 'true',
                  },
                  aOkRf01: {
                    canBeCreatedManually: 'true',
                  },
                  raex: {
                    canBeCreatedManually: 'true',
                  },
                  mediaMount: {
                    canBeCreatedManually: 'true',
                  },
                  dolatDlm1: {
                    canBeCreatedManually: 'true',
                  },
                  asp: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '16777215',
                  },
                },
              },
              id0_32767: {
                types: {
                  siemensSf01: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '32767',
                  },
                },
              },
              id1_32767: {
                types: {
                  trc02_2: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '32767',
                  },
                },
              },
              'id1_524287-unitCode1_4': {
                types: {
                  eurodomest: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '524287',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4',
                  },
                },
              },
              'id1_32767-unitCode1_10': {
                types: {
                  livolo1to10: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '32767',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '10',
                  },
                },
              },
              'id0_65535-gcA_P-uc1_5': {
                types: {
                  blyss: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '65535',
                  },
                  groupCode: {
                    type: 'string',
                    regex: '[A-P]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '5',
                  },
                },
              },
              'id0_65535-gc0_3-uc1_8': {
                types: {
                  cuveo: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '65535',
                  },
                  groupCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '3',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '8',
                  },
                },
              },
              'id0_65535-gcA_C-uc1_8': {
                types: {
                  funkbus: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '65535',
                  },
                  groupCode: {
                    type: 'string',
                    regex: '[A-C]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '8',
                  },
                },
              },
              seavTxs4: {
                types: {
                  seavTxs4: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  'sw2-1': {
                    type: 'bool',
                  },
                  'sw2-2': {
                    type: 'bool',
                  },
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '32767',
                  },
                },
              },
              'id1_65535-uc1_6': {
                types: {
                  zemismart: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '65535',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '6',
                  },
                },
              },
              'id1_65535-uc1_15': {
                types: {
                  rollerTrolHastaNew: {
                    canBeCreatedManually: 'true',
                  },
                  hastaOld: {
                    canBeCreatedManually: 'true',
                  },
                  confexx: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '65535',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '15',
                  },
                },
              },
              'id1_65535-uc1_30': {
                types: {
                  kangtai: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '65535',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '30',
                  },
                },
              },
              'id1_65535-uc1_99': {
                types: {
                  screenline: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '65535',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '99',
                  },
                },
              },
              'id1_4294967295-uc1_15': {
                types: {
                  dc106: {
                    canBeCreatedManually: 'true',
                  },
                  forest: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4294967295',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '15',
                  },
                },
              },
              'id1_4095-uc1_6': {
                types: {
                  chamberlaincs4330cn: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4095',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '6',
                  },
                },
              },
              'id1_1048575-uc0_4': {
                types: {
                  rfy: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '1048575',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '4',
                  },
                },
              },
              'id1_1048575-uc1_5': {
                types: {
                  asa: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '1048575',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '5',
                  },
                },
              },
              'id1_1048575-uc0_15': {
                types: {
                  rfyExt: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '1048575',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '15',
                  },
                },
              },
              'id1_524287-hcA_D-uc1_4': {
                types: {
                  homeConfort: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '524287',
                  },
                  houseCode: {
                    type: 'string',
                    regex: '[A-D]',
                    defaultValue: 'A',
                  },
                  unitCode: {
                    type: 'int',
                    minimumValue: '1',
                    maximumValue: '4',
                  },
                },
              },
              id0_268435456: {
                types: {
                  keeLoq: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  id: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '268435456',
                  },
                },
              },
              uc0_31: {
                types: {
                  he105: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '31',
                  },
                },
              },
              uc0_255: {
                types: {
                  rts10: {
                    canBeCreatedManually: 'true',
                  },
                  g6rH4t1: {
                    canBeCreatedManually: 'true',
                  },
                  g6rH3t1: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '255',
                  },
                },
              },
              uc0_262143: {
                types: {
                  g6rH4tb: {
                    canBeCreatedManually: 'true',
                  },
                  g6rH4s: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '262143',
                  },
                },
              },
              uc0_65535: {
                types: {
                  g6rH4td: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  unitCode: {
                    type: 'int',
                    minimumValue: '0',
                    maximumValue: '65535',
                  },
                },
              },
              'hcrx-garx-sarx': {
                types: {
                  fs20: {
                    canBeCreatedManually: 'true',
                  },
                  fht8v: {
                    canBeCreatedManually: 'true',
                  },
                  fht80: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[1-4]{8}',
                    defaultValue: '11111111',
                  },
                  groupAddress: {
                    type: 'string',
                    regex: '[1-4]{2}',
                    defaultValue: '11',
                  },
                  subAddress: {
                    type: 'string',
                    regex: '[1-4]{2}',
                    defaultValue: '11',
                  },
                },
              },
              cameraX10Ninja: {
                types: {
                  cameraX10Ninja: {
                    canBeCreatedManually: 'true',
                  },
                },
                content: {
                  houseCode: {
                    type: 'string',
                    regex: '[A-P]',
                    defaultValue: 'A',
                  },
                },
              },
              'Encoder Module': {
                types: {
                  'Encoder Module': {
                    canBeCreatedManually: 'false',
                  },
                },
                content: {
                  counter1Configuration: {
                    type: 'enum',
                    values: {
                      energyWh: 'Energy (Wh)',
                      waterLiter: 'Water (Liter)',
                      waterQuarterLiter: 'Water (¼ Liter)',
                      gasDeciM3: 'Gas (1/10 m3)',
                      gasCentiM3: 'Gas (1/100 m3)',
                      raw: 'Other',
                    },
                    defaultValue: 'Other',
                  },
                  counter2Configuration: {
                    type: 'enum',
                    values: {
                      energyWh: 'Energy (Wh)',
                      waterLiter: 'Water (Liter)',
                      waterQuarterLiter: 'Water (¼ Liter)',
                      gasDeciM3: 'Gas (1/10 m3)',
                      gasCentiM3: 'Gas (1/100 m3)',
                      raw: 'Other',
                    },
                    defaultValue: 'Other',
                  },
                },
              },
            },
          },
        },
        extraQueries: {
          firmwareUpdate: {
            iconClass: 'fa fa-upload',
            commandData: {
              fileContent: {
                type: 'file',
                filter: '.hex',
              },
            },
          },
          pairing: {
            iconClass: 'fa fa-handshake-o',
          },
        },
      },
    },
  ],
});
module.exports = plugins;

const pluginsInstances = JSON.stringify({
  instances: [
    {
      id: 1,
      displayName: 'System',
      type: 'System',
      configuration: {},
      autoStart: true,
      category: 'System',
      state: 'Running',
      fullState: {
        state: 'Running',
        messageId: '',
        messageData: '',
      },
    },
    {
      id: 2,
      displayName: 'Faux Plugin',
      type: 'dev-fakePlugin',
      configuration: {
        StringParameter: '',
        BoolParameter: false,
        IntParameter: 258,
        DecimalParameter: 25.3,
        EnumParameter: 'EnumValue2',
        MySection: {
          content: {
            SubIntParameter: 65535,
            SubStringParameter: '',
          },
        },
        ConditionalParameter: '',
        SystemData: {
          content: {
            SerialPort: '\\\\.\\COM10',
            UsbDevices:
              '\\\\?\\usb#vid_413c&pid_2010#d&1ab3202&0&1#{a5dcbf10-6530-11d2-901f-00c04fb951ed}',
            NetworkInterfaces: 'Loopback Pseudo-Interface 1',
            NetworkInterfacesWithoutLoopback: 'VirtualBox Host-Only Network',
            SupportedTimezones: 'Africa/Abidjan',
          },
        },
      },
      autoStart: true,
      category: 'User',
      state: 'Running',
      fullState: {
        state: 'Running',
        messageId: '',
        messageData: '{}',
      },
    },
  ],
});
module.exports = pluginsInstances;

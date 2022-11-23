import { DeviceEntity } from './devices.models';
import {
  devicesAdapter,
  DevicesPartialState,
  initialDevicesState,
} from './devices.reducer';
import * as DevicesSelectors from './devices.selectors';

describe('Devices Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDevicesId = (it: DeviceEntity) => it.id;
  const getDevicesFriendlyName = (it: DeviceEntity) => it.friendlyName;
  const createDevicesEntity = (id: number, friendlyName = ''): DeviceEntity => ({
    id,
    pluginInstance: 0,
    friendlyName,
    details: {},
    configuration: {},
    type: '',
    blacklisted: false
  });

  let state: DevicesPartialState;

  beforeEach(() => {
    state = {
      devices: devicesAdapter.setAll(
        [
          createDevicesEntity(1, 'aaa'),
          createDevicesEntity(2, 'bbb'),
          createDevicesEntity(3, 'ccc'),
        ],
        {
          ...initialDevicesState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Devices Selectors', () => {
    it('getAllDevices() should return the list of Devices', () => {
      const results = DevicesSelectors.getAllDevices(state);

      expect(results.length).toBe(3);
      expect(getDevicesId(results[1])).toBe(2);
      expect(getDevicesFriendlyName(results[1])).toBe('bbb');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DevicesSelectors.getSelected(state) as DeviceEntity;

      expect(getDevicesId(result)).toBe(2);
      expect(getDevicesFriendlyName(result)).toBe('bbb');
    });

    it('getDevicesLoaded() should return the current "loaded" status', () => {
      const result = DevicesSelectors.getDevicesLoaded(state);

      expect(result).toBe(true);
    });

    it('getDevicesError() should return the current "error" state', () => {
      const result = DevicesSelectors.getDevicesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

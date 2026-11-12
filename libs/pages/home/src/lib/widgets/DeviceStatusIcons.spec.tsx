import { render } from '@testing-library/react';

import {
  DeviceStatusIcons,
  batteryLevel,
  signalPowerLevel,
} from './DeviceStatusIcons';

describe('signalPowerLevel', () => {
  it.each([
    [0, 'low'],
    [39, 'low'],
    [40, 'medium'],
    [69, 'medium'],
    [70, 'high'],
    [100, 'high'],
  ])('%d%% is %s', (percent, expected) => {
    expect(signalPowerLevel(percent)).toBe(expected);
  });
});

describe('batteryLevel', () => {
  it.each([
    [0, 'low'],
    [19, 'low'],
    [20, 'medium'],
    [49, 'medium'],
    [50, 'high'],
    [100, 'high'],
  ])('%d%% is %s', (percent, expected) => {
    expect(batteryLevel(percent)).toBe(expected);
  });
});

describe('DeviceStatusIcons', () => {
  it('renders nothing without values', () => {
    const { queryByTestId } = render(<DeviceStatusIcons />);
    expect(queryByTestId('signal-power-icon')).toBeNull();
    expect(queryByTestId('battery-level-icon')).toBeNull();
  });

  it('renders only the signal power icon', () => {
    const { queryByTestId } = render(<DeviceStatusIcons signalPower={50} />);
    expect(queryByTestId('signal-power-icon')).not.toBeNull();
    expect(queryByTestId('battery-level-icon')).toBeNull();
  });

  it('renders icons in unknown state when keywords have no value', () => {
    const { getByTestId } = render(
      <DeviceStatusIcons signalPower={null} batteryLevel={null} />
    );
    expect(getByTestId('signal-power-icon').title).toContain('inconnue');
    expect(getByTestId('battery-level-icon').title).toContain('inconnue');
  });

  it('renders both icons', () => {
    const { queryByTestId } = render(
      <DeviceStatusIcons signalPower={80} batteryLevel={10} />
    );
    expect(queryByTestId('signal-power-icon')).not.toBeNull();
    expect(queryByTestId('battery-level-icon')).not.toBeNull();
  });
});

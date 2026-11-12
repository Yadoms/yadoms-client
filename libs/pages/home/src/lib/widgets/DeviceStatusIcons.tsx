import {
  IconAntennaBars2,
  IconAntennaBars4,
  IconAntennaBars5,
  IconAntennaBarsOff,
  IconBattery1,
  IconBattery2,
  IconBattery4,
  IconBatteryOff,
} from '@tabler/icons-react';

export type StatusLevel = 'low' | 'medium' | 'high';

export function signalPowerLevel(percent: number): StatusLevel {
  if (percent < 40) return 'low';
  if (percent < 70) return 'medium';
  return 'high';
}

export function batteryLevel(percent: number): StatusLevel {
  if (percent < 20) return 'low';
  if (percent < 50) return 'medium';
  return 'high';
}

const signalIcons = {
  low: IconAntennaBars2,
  medium: IconAntennaBars4,
  high: IconAntennaBars5,
};

const batteryIcons = {
  low: IconBattery1,
  medium: IconBattery2,
  high: IconBattery4,
};

const batteryColors: Record<StatusLevel, string | undefined> = {
  low: 'var(--mantine-color-red-6)',
  medium: 'var(--mantine-color-orange-6)',
  high: undefined,
};

const UNKNOWN_COLOR = 'var(--mantine-color-gray-5)';

/**
 * For each value: undefined hides the icon (no such keyword on the device),
 * null shows it in an unknown state (keyword exists but has no value yet).
 */
type DeviceStatusIconsProps = {
  signalPower?: number | null;
  batteryLevel?: number | null;
  size?: number;
};

function formatPercent(value: number | null) {
  return value === null ? 'inconnue' : `${value} %`;
}

export function DeviceStatusIcons({
  signalPower,
  batteryLevel: battery,
  size = 20,
}: DeviceStatusIconsProps) {
  const batteryStatus =
    battery !== undefined && battery !== null ? batteryLevel(battery) : null;

  const SignalIcon =
    signalPower === null
      ? IconAntennaBarsOff
      : signalPower !== undefined
      ? signalIcons[signalPowerLevel(signalPower)]
      : null;
  const BatteryIcon = batteryStatus
    ? batteryIcons[batteryStatus]
    : IconBatteryOff;

  return (
    <>
      {SignalIcon && signalPower !== undefined && (
        <span
          data-testid="signal-power-icon"
          title={`Puissance d'émission : ${formatPercent(signalPower)}`}
          style={{ display: 'inline-flex' }}
        >
          <SignalIcon
            size={size}
            stroke={2}
            color={signalPower === null ? UNKNOWN_COLOR : undefined}
          />
        </span>
      )}
      {battery !== undefined && (
        <span
          data-testid="battery-level-icon"
          title={`Batterie : ${formatPercent(battery)}`}
          style={{ display: 'inline-flex' }}
        >
          <BatteryIcon
            size={size}
            stroke={2}
            color={batteryStatus ? batteryColors[batteryStatus] : UNKNOWN_COLOR}
          />
        </span>
      )}
    </>
  );
}

export default DeviceStatusIcons;

import { parseYadomsDate } from '@yadoms/shared';

const UNIT_SYMBOLS: Record<string, string> = {
  noUnit: '',
  ampere: 'A',
  ampereHour: 'Ah',
  cubicMetre: 'm³',
  cubicMeterPerSecond: 'm³/s',
  decibel: 'dB',
  decibelPerMilliWatt: 'dBm',
  degrees: '°',
  degreesCelcius: '°C',
  degreesFarenheit: '°F',
  hectoPascal: 'hPa',
  hertz: 'Hz',
  kg: 'kg',
  lux: 'lx',
  meter: 'm',
  metersPerSecond: 'm/s',
  millimeter: 'mm',
  millimeterPerSecond: 'mm/s',
  percent: '%',
  second: 's',
  uv: 'UV',
  volt: 'V',
  voltAmpere: 'VA',
  watt: 'W',
  wattPerHour: 'Wh',
  wattPerSquareMeter: 'W/m²',
};

/** Server units are translation keys, like "data.units.degreesCelcius" */
export function unitSymbol(units: string | undefined): string {
  if (!units) return '';
  const name = units.split('.').pop() ?? '';
  return UNIT_SYMBOLS[name] ?? name;
}

/** Server sends typeInfo as a JSON string, like '{"min":0,"max":100,"step":1}' */
export function parseTypeInfo<T extends object>(typeInfo: unknown): Partial<T> {
  if (typeof typeInfo === 'string') {
    try {
      const parsed = JSON.parse(typeInfo);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
  return typeInfo && typeof typeInfo === 'object' ? typeInfo : {};
}

export function isTrueValue(value: string): boolean {
  return ['1', 'true'].includes(value.toLowerCase());
}

/** Returns undefined when the keyword never received any acquisition */
export function parseAcquisitionDate(
  date: string | Date | undefined
): Date | undefined {
  if (!date) return undefined;
  const parsed = parseYadomsDate(date);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

export function formatElapsedTime(
  date: Date,
  now: number,
  locale: string
): string {
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });
  const minutes = Math.max(0, Math.floor((now - date.getTime()) / 60000));
  if (minutes < 60) return format.format(-minutes, 'minute');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return format.format(-hours, 'hour');
  return format.format(-Math.floor(hours / 24), 'day');
}

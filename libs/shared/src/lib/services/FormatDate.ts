import { useTranslation } from 'react-i18next';

export function FormatDate(isoDate: string | undefined): string {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  if (!isoDate) {
    return '';
  }

  const year = parseInt(isoDate.slice(0, 4), 10);
  const month = parseInt(isoDate.slice(4, 6), 10) - 1;
  const day = parseInt(isoDate.slice(6, 8), 10);
  const hour = parseInt(isoDate.slice(9, 11), 10);
  const minute = parseInt(isoDate.slice(11, 13), 10);
  const second = parseInt(isoDate.slice(13, 15), 10);
  const millisecond = Math.round(
    parseFloat('0.' + isoDate.split('.')[1]) * 1000
  );

  const date = new Date(year, month, day, hour, minute, second, millisecond);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return date.toLocaleDateString(locale, options);
}

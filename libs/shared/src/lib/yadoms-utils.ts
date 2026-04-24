/**
 * Utility functions for Yadoms data handling
 */

/**
 * Parses a Yadoms date string into a Date object.
 * Yadoms dates are in format YYYYMMDDTHHMMSS.ssssss (without separators)
 * This function converts them to ISO format for Date constructor.
 * @param dateAsString The date string from Yadoms API (string or Date)
 * @returns A Date object
 */
export function parseYadomsDate(dateAsString: string | Date): Date {
  // If already a Date, return it directly
  if (dateAsString instanceof Date) {
    return dateAsString;
  }
  return new Date(
    dateAsString.replace(
      /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2}).([0-9]*)/,
      '$1-$2-$3T$4:$5:$6.$7'
    )
  );
}

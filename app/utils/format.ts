import { format, toZonedTime } from "date-fns-tz";

export function formatCentsToDollars(cents: number): string {
  const dollars = cents / 100;
  return dollars.toFixed(1);
}

export function formatShiftDateRange(
  startISO: string,
  endISO: string,
  timeZone = "America/Chicago"
): string {
  const start = toZonedTime(startISO, timeZone);
  const end = toZonedTime(endISO, timeZone);

  const dayPart = format(start, "MMM d, EEE", { timeZone }).toUpperCase();
  const startTime = format(start, "h:mm a", { timeZone }).toLocaleUpperCase();
  const endTime = format(end, "h:mm a", { timeZone }).toLocaleUpperCase();

  return `${dayPart} ${startTime} - ${endTime}`;
}

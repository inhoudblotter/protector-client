import { formatTime } from "./formatTime";

export function formatDateToISO(date: Date) {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${formatTime(date.getHours())}:${formatTime(
    date.getMinutes()
  )}:${formatTime(date.getSeconds())}+5`;
}

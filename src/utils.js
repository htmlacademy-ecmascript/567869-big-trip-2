import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function calculateTimeDifference(dateFrom, dateTo) {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);

  const diffInMilliseconds = endTime.diff(startTime);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days}D ${remainingHours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
}
export { getRandomArrayElement, humanizeDate, calculateTimeDifference };

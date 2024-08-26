import dayjs from 'dayjs';

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
    return `${days.toString().padStart(2, '0')}D ${remainingHours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString().padStart(2, '0')}M`;
  }
}

export { humanizeDate, calculateTimeDifference };

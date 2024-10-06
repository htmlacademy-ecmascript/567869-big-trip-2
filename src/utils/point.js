import dayjs from 'dayjs';

function getOffersForPoint (point, offers) {

  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return '';
  }
  return pointTypeOffer;
}

function getDestinationForPoint (point, destinations) {

  const destinationData = destinations.find((destination) => destination.id === point.destination);

  if (!destinationData) {
    return '';
  }
  return destinationData;
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
    return `${days.toString().padStart(2, '0')}D ${remainingHours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes.toString().padStart(2, '0')}M`;
  }
}

const getDurationEventPointHour = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom,'hour');

const sortPointTime = (pointA, pointB) => {
  const durationPointA = getDurationEventPointHour(pointA.dateFrom, pointA.dateTo);
  const durationPointB = getDurationEventPointHour(pointB.dateFrom, pointB.dateTo);
  return durationPointA - durationPointB;
};

const sortPointPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export { getOffersForPoint, getDestinationForPoint, humanizeDate, calculateTimeDifference, sortPointTime, sortPointPrice };

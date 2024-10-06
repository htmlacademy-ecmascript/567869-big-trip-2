const POINT_COUNT = 5;
const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATIONS = ['San Francisco', 'New York', 'London', 'Moscow'];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const DateTimeFormat = {
  TIME: 'HH:mm',
  SHORT_DATE: 'MMM D',
  LONG_DATE: 'YYYY-MM-DDTHH:mm',
  LONG_DATE_FOR_EDIT: 'DD/MM/YY HH:mm',
};

const NoPointListMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

export {
  POINT_COUNT,
  POINT_TYPES,
  DESTINATIONS,
  Mode,
  SortType,
  DateTimeFormat,
  NoPointListMessage
};

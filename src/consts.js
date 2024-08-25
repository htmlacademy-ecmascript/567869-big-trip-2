const POINT_COUNT = 3;
const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT = 'MMM D';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATETIME_FORMAT_SLASH = 'DD/MM/YY HH:mm';

const EmptyPointListMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

export { POINT_COUNT, POINT_TYPES, DATETIME_FORMAT, TIME_FORMAT, DATE_FORMAT, DATETIME_FORMAT_SLASH, EmptyPointListMessage };

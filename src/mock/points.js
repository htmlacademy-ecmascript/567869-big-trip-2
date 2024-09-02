import { getRandomArrayElement } from '../utils/common.js';

const mockPoints = [
  {
    id: 'flight-point',
    basePrice: 14100,
    dateFrom: '2025-08-14T22:55:56.845Z',
    dateTo: '2025-08-15T11:00:00.375Z',
    destination: 'moscow-point-1',
    isFavorite: false,
    offers: [
      'flight-luxe'
    ],
    type: 'flight'
  },
  {
    id: 'ship-point',
    basePrice: 7400,
    dateFrom: '2024-08-22T12:30:56.845Z',
    dateTo: '2024-08-23T14:40:13.375Z',
    destination: 'saint-petersburg-point-2',
    isFavorite: true,
    offers: [],
    type: 'ship'
  },
  {
    id: 'taxi-point',
    basePrice: 1100,
    dateFrom: '2024-08-12T12:00:00.845Z',
    dateTo: '2024-08-12T14:30:00.375Z',
    destination: 'belgorod-point-3',
    isFavorite: false,
    offers: [
      'taxi-comfort'
    ],
    type: 'taxi'
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };

import { getRandomPoint } from '../mock/points.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';
import { POINT_COUNT } from '../consts.js';

export default class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, getRandomPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return [...this.#points];
  }

  get destinations() {
    return [...this.#destinations];
  }

  get offers() {
    return [...this.#offers];
  }
}

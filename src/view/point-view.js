import { DateTimeFormat } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getOffersForPoint, getDestinationForPoint, calculateTimeDifference, humanizeDate } from '../utils/point.js';

function createSelectedOffersTemplate(point, offers) {
  const pointTypeOffer = getOffersForPoint(point, offers);

  const pointOffers = point.offers.map((offerId) => {

    const foundOffer = pointTypeOffer.offers.find((offer) => offer.id === offerId);
    if (!foundOffer) {
      return '';
    }
    const { title, price } = foundOffer;


    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
  });

  return pointOffers.join('');
}

function createPointTemplate(point, offers, destinations) {

  const { type, dateFrom, dateTo, basePrice, isFavorite } = point;
  const destinationData = getDestinationForPoint(point, destinations);
  const { name } = destinationData;

  const isFavoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const selectedOfferTemplate = createSelectedOffersTemplate(point, offers);

  return (`
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${humanizeDate(dateFrom, DateTimeFormat.SHORT_DATE)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${humanizeDate(dateFrom, DateTimeFormat.LONG_DATE)}">${humanizeDate(dateFrom, DateTimeFormat.TIME)}</time>
          &mdash;
          <time class="event__end-time" datetime="${humanizeDate(dateTo, DateTimeFormat.LONG_DATE)}">${humanizeDate(dateTo, DateTimeFormat.TIME)}</time>
        </p>
        <p class="event__duration">${calculateTimeDifference(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${selectedOfferTemplate}
      </ul>
      <button class="event__favorite-btn ${isFavoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `);
}

export default class PointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destinations, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#eventClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #eventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}

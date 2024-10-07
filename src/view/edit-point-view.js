import { DateTimeFormat, DESTINATIONS, POINT_TYPES } from '../consts.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormattedType } from '../utils/common.js';
import { getDestinationForPoint, getOffersForPoint, humanizeDate } from '../utils/point.js';

function createEditPointTypePointTemplate() {
  return POINT_TYPES.map((type) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getFormattedType(type)}</label>
  </div> `).join('');
}

function createOffersTemplate(point, offers) {
  const pointTypeOffer = getOffersForPoint(point, offers);

  if (pointTypeOffer.offers.length === 0) {
    return '';
  }

  const pointAllOffers = pointTypeOffer.offers.map((offer) => {

    const isChecked = point.offers.includes(offer.id) ? 'checked' : '';
    const { title, price, id } = offer;
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-${id}" ${isChecked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
  }
  );


  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${pointAllOffers.join('')}
  </div>
  </section>`;
}


function createEditPointDestinationOptionTemplate() {
  return DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join('');
}

function createDescriptionOfDestinationTemplate(point, destinations) {
  const destinationData = getDestinationForPoint(point, destinations);
  if (point.destination === '' || destinationData.description === '') {
    return '';
  }

  const { description, pictures } = destinationData;
  const photoOfDestination = pictures.map((picture) => `<img class="event__photo" src=${picture.src}" alt="Event photo"></img>`);
  return (`
  <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${photoOfDestination}
        </div>
      </div>
    </section>
  </section>`);
}

function createEventTypeTemplate(point) {

  const { type } = point;
  const typeTemplate = createEditPointTypePointTemplate();

  return (`
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${typeTemplate}
        </fieldset>
      </div>
    </div>`);
}

function createFieldGroupDestinationTemplate(point, destinations) {

  const { type } = point;
  const destinationData = getDestinationForPoint(point, destinations);
  let { name } = destinationData;
  if (point.destination === '') {
    name = '';
  }
  const destinationTemplate = createEditPointDestinationOptionTemplate();

  return (`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationTemplate}
      </datalist>
    </div>`);
}

function createFieldEventDateTemplate(point) {

  const { dateTo, dateFrom } = point;

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateTimeFormat.LONG_DATE_FOR_EDIT)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateTimeFormat.LONG_DATE_FOR_EDIT)}">
    </div>`);
}

function createFieldEventPriceTemplate(point) {

  const { basePrice } = point;
  if (basePrice === '') {
    return (`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>`);
  }

  const correctPrice = parseInt(basePrice, 10);

  if (isNaN(correctPrice) || correctPrice < 0) {
    return (`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>`);
  }

  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${correctPrice}">
    </div>`);
}

function createEditPointTemplate(point, offers, destinations) {
  const offerTemplate = createOffersTemplate(point, offers);
  const descriptionOfDestinationTemplate = createDescriptionOfDestinationTemplate(point, destinations);

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createEventTypeTemplate(point)}
        ${createFieldGroupDestinationTemplate(point, destinations)}
        ${createFieldEventDateTemplate(point)}
        ${createFieldEventPriceTemplate(point)}
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offerTemplate}
        ${descriptionOfDestinationTemplate}
      </section>
    </form>`);
}
export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({ point, offers, destinations, onFormSubmit }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.addEventListener('change', (evt) => {
      if (evt.target.classList.contains('event__offer-checkbox')) {
        this.#offerChangeHandler(evt);
      }
    });
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state), this.#offers, this.#destinations);
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedOfferId = evt.target.id;
    const isChecked = evt.target.checked;
    let newOffers;
    if (isChecked && !this._state.offers.includes(selectedOfferId)) {
      newOffers = [...this._state.offers, selectedOfferId];
    } else if (!isChecked) {
      newOffers = this._state.offers.filter((offer) => offer !== selectedOfferId);
    } else {
      newOffers = this._state.offers;
    }
    this._setState({
      offers: newOffers,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateElement({
      type: newType,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = evt.target.value;
    const destinationData = this.#destinations.find((destination) => destination.name === newDestination);
    this.updateElement({
      destination: destinationData.id,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice
    });
  };

  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}

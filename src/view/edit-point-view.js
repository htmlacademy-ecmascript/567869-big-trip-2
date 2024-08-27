import { DateTimeFormat, POINT_TYPES } from '../consts.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils/point.js';

function createOffersTemplate(point, offers) {

  const offersData = offers.find((offer) => offer.type === point.type);
  const offersType = offersData ? offersData.offers : [];

  if (offersType.length === 0) {
    return `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
  </section>`;
  }

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersType.map((offer) => {
      const isChecked = point.offers.includes(offer.id) ? 'checked' : '';
      const { id, title, price } = offer;
      return `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" id="${id}" type="checkbox" name="event-offer-${id}"${isChecked}>
            <label class="event__offer-label" for="${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
    }).join('')}
      </div>
    </section>`
  );
}

function createDestinationTemplate(point, destinations) {

  const destinationData = destinations.find((destination) => destination.id === point.destination);
  if (destinationData) {
    const { description, pictures } = destinationData;

    return `
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
        <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures && pictures.length > 0
        ? pictures.map((picture) => `
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')
        : '<div></div>'}
        </div>
      </div>
      </section>`;
  } else {
    return '<section class="event__section event__section--destination"></section>';
  }
}

function createEditPointTemplate(point, offers, destinations) {
  const { type, dateFrom, dateTo, basePrice } = point;
  const destinationData = destinations.find((destination) => destination.id === point.destination);
  const offersList = createOffersTemplate(point, offers);
  const destinationsList = createDestinationTemplate(point, destinations);

  const { name } = destinationData;

  return `
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((pointType) => (
    `<div class="event__type-item">
              <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType[0].toUpperCase()}${pointType.slice(1)}</label>
            </div>`
  )).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`)}
        </datalist>
</div>

<div class="event__field-group  event__field-group--time">
<label class="visually-hidden" for="event-start-time-1">From</label>
<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateTimeFormat.LONG_DATE_FOR_EDIT)}">
&mdash;
<label class="visually-hidden" for="event-end-time-1">To</label>
<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateTimeFormat.LONG_DATE_FOR_EDIT)}">
</div>

<div class="event__field-group  event__field-group--price">
<label class="event__label" for="event-price-1">
<span class="visually-hidden">Price</span>
&euro;
</label>
<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
</div>

<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
<button class="event__reset-btn" type="reset">Delete</button>
<button class="event__rollup-btn" type="button">
<span class="visually-hidden">Open event</span>
</button>
</header>
<section class="event__details">
${offersList}
${destinationsList}
</form>
`;
}

export default class EditPointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({ point, offers, destinations, onFormSubmit }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}

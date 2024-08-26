import AbstractView from '../framework/view/abstract-view.js';

function createEmptyPointsTemplate(message) {
  return `
  <p class="trip-events__msg">
    ${message}
  </p>`;
}

export default class EmptyPointsView extends AbstractView {
  #message = null;

  constructor (message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyPointsTemplate(this.#message);
  }
}

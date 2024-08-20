import { render } from '../framework/render.js';
// import EditPointView from '../view/edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = new SortView();

  #eventPoints = [];
  #eventDestinations = [];
  #eventOffers = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventOffers = this.#pointsModel.offers;
    this.#eventDestinations = this.#pointsModel.destinations;

    render(this.#sortComponent, this.#eventsContainer);
    // render(new EditPointView({
    //   point: this.#eventPoints[0],
    //   offers: this.#eventOffers,
    //   destinations: this.#eventDestinations
    // }), this.#eventsContainer);

    render(this.#eventListComponent, this.#eventsContainer);
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint(this.#eventPoints[i], this.#eventOffers, this.#eventDestinations);
    }
  }

  #renderPoint(point, offers, destinations) {
    const pointComponent = new PointView({ point, offers, destinations });
    render(pointComponent, this.#eventListComponent.element);
  }
}

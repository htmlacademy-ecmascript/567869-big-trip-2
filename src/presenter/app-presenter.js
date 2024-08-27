import { NoPointListMessage } from '../consts.js';
import { render } from '../framework/render.js';
import EmptyPointsView from '../view/empty-points-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class AppPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #emptyPointsComponent = new EmptyPointsView(NoPointListMessage.EVERYTHING);

  #eventPoints = [];
  #eventDestinations = [];
  #eventOffers = [];
  #pointPresenters = new Map();

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderApp();
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderPointList() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderNoPoints() {
    render(this.#emptyPointsComponent, this.#eventsContainer);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points, destinations, offers) {
    points.forEach((point) => {
      this.#renderPoint(point, destinations, offers);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderApp() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventOffers = this.#pointsModel.offers;
    this.#eventDestinations = this.#pointsModel.destinations;

    if (this.#eventPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints(this.#eventPoints, this.#eventOffers, this.#eventDestinations);
  }
}

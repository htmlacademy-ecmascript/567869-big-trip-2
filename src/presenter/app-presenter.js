import { NoPointListMessage } from '../consts.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
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
    this.#eventPoints = this.#pointsModel.points;
    this.#eventOffers = this.#pointsModel.offers;
    this.#eventDestinations = this.#pointsModel.destinations;

    if (this.#eventPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

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

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      offers: this.#eventOffers,
      destinations: this.#eventDestinations,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderApp() {
    this.#renderSort();
    this.#renderPointList();

    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint(this.#eventPoints[i]);
    }
  }

  #handlePointChange = (updatePoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetFormView());
  };
}

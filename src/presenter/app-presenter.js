import { NoPointListMessage, SortType } from '../consts.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortPointPrice, sortPointTime } from '../utils/point.js';
import EmptyPointsView from '../view/empty-points-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class AppPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;
  #emptyPointsComponent = new EmptyPointsView(NoPointListMessage.EVERYTHING);

  #eventPoints = [];
  #eventDestinations = [];
  #eventOffers = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedEventPoints = [];

  constructor({ eventsContainer, pointsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = this.#pointsModel.points;
    this.#eventOffers = this.#pointsModel.offers;
    this.#eventDestinations = this.#pointsModel.destinations;
    this.#sourcedEventPoints = [...this.#eventPoints];


    if (this.#eventPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderApp();
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

  #renderPoints() {
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint(this.#eventPoints[i]);
    }
  }

  #renderPointList() {
    render(this.#eventListComponent, this.#eventsContainer);
    this.#renderPoints();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderApp() {
    this.#renderSort();
    this.#renderPointList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#eventPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#eventPoints.sort(sortPointPrice);
        break;
      default:
        this.#eventPoints = [...this.#sourcedEventPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };


  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#eventsContainer);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetFormView());
  };
}

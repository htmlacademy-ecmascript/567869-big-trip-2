import { NoPointListMessage } from '../consts.js';
import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import EmptyPointsView from '../view/empty-points-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class AppPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = new SortView();
  #emptyPointsComponent = new EmptyPointsView(NoPointListMessage.EVERYTHING);

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point, offers, destinations, onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point, offers, destinations, onFormSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderPoints() {
    this.#eventPoints.forEach((point) => {
      this.#renderPoint(point, this.#eventOffers, this.#eventDestinations);
    });
  }

  #renderApp() {
    if (this.#eventPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    this.#renderPoints();

  }
}

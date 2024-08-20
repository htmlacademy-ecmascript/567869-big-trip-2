import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
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

    this.#renderEvents();
  }

  #renderPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({ point, offers, destinations, onEditClick: () => {
      replacePointToEditForm();
      document.addEventListener('keydown', escKeyDownHandler);
    } });

    const pointEditComponent = new EditPointView({point, offers, destinations, onFormSubmit: () => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    function replacePointToEditForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderEvents() {
    render(this.#sortComponent, this.#eventsContainer);

    render(this.#eventListComponent, this.#eventsContainer);
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderPoint(this.#eventPoints[i], this.#eventOffers, this.#eventDestinations);
    }
  }
}

import { render } from '../render.js';
import EditPointView from '../view/edit-point-view.js';
import EventsListView from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  sortComponent = new SortView();

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventPoints = this.pointsModel.getPoints();
    this.eventDestinations = this.pointsModel.getDestinations();
    this.eventOffers = this.pointsModel.getOffers();

    render(this.sortComponent, this.container);
    render(new EditPointView({
      point: this.eventPoints[0],
      offers: this.eventOffers,
      destinations: this.eventDestinations
    }), this.container);

    render(this.eventsListComponent, this.container);
    for (let i = 0; i < this.eventPoints.length; i++) {
      render(new PointView({
        point: this.eventPoints[i],
        offers: this.eventOffers,
        destinations: this.eventDestinations
      }), this.eventsListComponent.getElement());
    }
  }
}

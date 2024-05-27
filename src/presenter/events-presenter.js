import { render } from '../render.js';
import EditPointView from '../view/edit-point-view.js';
import EventsListView from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();
  editPointComponent = new EditPointView();
  sortComponent = new SortView();

  constructor({ container }) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.editPointComponent, this.container);
    render(this.eventsListComponent, this.container);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventsListComponent.getElement());
    }
  }
}

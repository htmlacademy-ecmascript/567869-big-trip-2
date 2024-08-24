import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterView from './view/filter-view.js';

const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  pointsModel
});

render(new FilterView(pointsModel.points), filterElement);

eventsPresenter.init();

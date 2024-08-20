import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/points-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const eventsPresenter = new EventsPresenter({
  container: eventsElement,
  pointsModel
});

render(new InfoTripView(), infoTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

eventsPresenter.init();

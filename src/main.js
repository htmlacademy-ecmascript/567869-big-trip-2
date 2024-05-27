import EventsPresenter from './presenter/events-presenter.js';
import { RenderPosition, render } from './render.js';
import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';

const infoTripElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({
  container: eventsElement,
});

render(new InfoTripView(), infoTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

eventsPresenter.init();

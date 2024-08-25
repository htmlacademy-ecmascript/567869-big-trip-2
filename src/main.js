import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import AppPresenter from './presenter/app-presenter.js';
import FilterView from './view/filter-view.js';

const filterElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const appPresenter = new AppPresenter({
  eventsContainer: eventsElement,
  pointsModel
});

render(new FilterView(pointsModel.points), filterElement);

appPresenter.init();

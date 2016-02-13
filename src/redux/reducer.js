import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import tasks from './modules/tasks/tasks';
import plans from './modules/plans/plans';
import sections from './modules/sections/sections';
import filter from './modules/filter';
import leftSideBar from './modules/leftSideBar';


const rootReducer = combineReducers({
  router: routeReducer,
  sections,
  plans,
  tasks,
  filter,
  leftSideBar
});

export default rootReducer;

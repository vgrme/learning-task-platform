import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import tasks from './modules/tasks/tasks';
import plans from './modules/plans/plans';
import sections from './modules/sections/sections';
import filters from './modules/filters';
import auth from './modules/auth';
import leftSideBar from './modules/leftSideBar';


const rootReducer = combineReducers({
  routing: routeReducer,
  auth,
  sections,
  plans,
  tasks,
  filters,
  leftSideBar
});

export default rootReducer;

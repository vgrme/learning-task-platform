import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import plans from './modules/plans';
import sections from './modules/sections';
import filter from './modules/filter';
import leftSideBar from './modules/leftSideBar';


const rootReducer = combineReducers({
  router: routeReducer,
  sections,
  plans,
  filter,
  leftSideBar
});

export default rootReducer;

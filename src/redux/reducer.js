import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import plans from './modules/plans';


const rootReducer = combineReducers({
  router: routeReducer,
  plans
});

export default rootReducer;

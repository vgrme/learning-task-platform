import * as plansService from 'services/plans';
import plan from './plan';
import {SET_CURRENT_PLAN} from './plansConstant';

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case LOAD:
      return plansService.getPlans();
    case UPDATE_PLAN_NAME:
      return state.map(p=>plan(p,action));
    default:
      return state;
  }
}
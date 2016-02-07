import * as plansService from 'services/plans';
import plan from './plan';
import {LOAD, UPDATE_PLAN_NAME} from '../constants/plansConstant';

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

export function loadPlans(){
  return {
    type: LOAD
  };
}

export function updatePlanName(planId, planName){
  return {
    type: UPDATE_PLAN_NAME,
    planId: planId,
    planName: planName
  };
}
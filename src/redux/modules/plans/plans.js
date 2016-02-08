import * as plansService from 'services/plans';
import plan from './plan';
import {LOAD, UPDATE_PLAN_NAME, SET_CURRENT_PLAN} from './plansConstant';

const initialState = {
  showCurrent: false,
  currentPlan: {},
  list: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        list: plansService.getPlans()
      };
    case UPDATE_PLAN_NAME:
      return {
        ...state,
        list: state.list.map(p=>plan(p, action))
      };
    case SET_CURRENT_PLAN:
      return {
        ...state,
        showCurrent: true,
        currentPlan: state.list.find(p=>p.id===action.planId),
        list: state.list.map(p=>plan(p, action))
      };
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

export function selectPlan(planId){
  return {
    type: SET_CURRENT_PLAN,
    planId: planId
  };
}
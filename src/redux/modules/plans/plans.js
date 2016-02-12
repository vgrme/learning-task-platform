import * as plansService from 'services/planService';
import plan from './plan';
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, 
        SAVE, SAVE_SUCCESS, SAVE_FAIL, 
        UPDATE_PLAN_NAME, SET_CURRENT_PLAN} from './plansConstant';

const initialState = {
  showCurrent: false,
  currentPlan: {},
  list: [],
  loading: false,
  loaded: false,
  saving: false,
  saved: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        list: action.result,
        loading: false,
        loaded: true
      };
    case SAVE:
      return {
        ...state,
        saving: true,
        saved: false
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        list: action.isNew?[action.result].concat(state.list):state.list
      };
    case SAVE_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.error
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
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/learning/plans')
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

export function savePlan(plan, isNew){
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    isNew: !plan._id,
    promise: (client) => client.post('/api/learning/plans',{data:plan})
  };
}
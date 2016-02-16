import * as plansService from 'services/planService';
import plan from './plan';
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, 
        LOAD_PCT, LOAD_PCT_SUCCESS, LOAD_PCT_FAIL,
        SAVE, SAVE_SUCCESS, SAVE_FAIL, 
        SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL,
        ADD_PLAN, STOP_ADD_PLAN,
        UPDATE_PLAN, ROLLBACK_PLAN, SET_CURRENT_PLAN} from './plansConstant';

const initialState = {
  showCurrent: false,
  currentPlanId: null,
  currentSectionId: null,
  list: [],
  percentageInfo: {},
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
    case LOAD_PCT_SUCCESS:
      return {
        ...state,
        percentageInfo: action.result
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
        list: plansService.findAndReplaceById(state.list, action.replaceWithResult?action.result:action.plan),
        saving: false,
        saved: true
      };
    case SAVE_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.error
      };
    case SAVE_ALL_SUCCESS:
      return {
        ...state,
        list: plansService.replacePlansBySection(state.list, action.sectionId, action.result),
        newPlan: null,
        saving: false,
        saved: true
      };
    case UPDATE_PLAN:
      if(!action.planId){
        return {
          ...state,
          newPlan: {...state.newPlan,[action.field]: action.data}
        };
      }
      return {
        ...state,
        list: state.list.map(p=>plan(p, action))
      };
    case ROLLBACK_PLAN:
      return {
        ...state,
        list: state.list.map(p=> plan(p, action))
      };
    case SET_CURRENT_PLAN:
      return {
        ...state,
        showCurrent: true,
        currentPlanId: action.planId,
        currentSectionId: action.sectionId,
        list: state.list.map(p=>plan(p, action))
      };
    case ADD_PLAN:
      return {
        ...state,
        newPlan: {name: '', active: true, order: 1, sectionId: action.sectionId}
      };
    case STOP_ADD_PLAN:
      return {
        ...state,
        newPlan: null
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

export function loadPlansPercentageInfo(){
  return {
    types: [LOAD_PCT, LOAD_PCT_SUCCESS, LOAD_PCT_FAIL],
    promise: (client) => client.get('/api/learning/percentage/plans')
  };
}

export function updatePlanName(planId, planName){
  return {
    type: UPDATE_PLAN,
    planId,
    field: 'name',
    data: planName
  };
}

export function savePlanName(plan, plans){
  if(!plan._id){
    if(!plan.name){
      return stopAddPlan();
    }
    else{
      var newPlansList = plansService.addPlan(plans, plan.sectionId, plan);
      return saveAllPlans(newPlansList, plan.sectionId, 'addNew');
    }
  }
  else{
    if(!plan.name){
      return rollbackPlanName(plan._id);
    }
    else if(plan.pre && plan.name !== plan.pre.name){
      return savePlan(plan, plan.sectionId);
    }
    else
      return {type: 'NO_CHANGE'};
  }
}

export function rollbackPlanName(planId){
  return {
    type: ROLLBACK_PLAN,
    planId,
    field: 'name'
  };
}

export function selectPlan(plan){
  return {
    type: SET_CURRENT_PLAN,
    planId: plan._id,
    sectionId: plan.sectionId
  };
}

export function addPlan(sectionId){
  return {
    type: ADD_PLAN,
    sectionId
  };
}

export function stopAddPlan(){
  return {
    type: STOP_ADD_PLAN
  };
}

export function changePlanActiveValue(plan){
  return savePlan({...plan, active: !plan.active}, plan.sectionId);
}

export function savePlan(plan, sectionId, replaceWithResult){
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    sectionId,
    plan,
    replaceWithResult,
    promise: (client) => client.post(`/api/learning/plans/${sectionId}`,{data:plan})
  };
}

export function saveAllPlans(plans, sectionId, reason){
  return {
    types: [SAVE, SAVE_ALL_SUCCESS, SAVE_FAIL],
    sectionId,
    reason,
    promise: (client) => client.post(`/api/learning/plans/${sectionId}/many`,{data:plans})
  };
}
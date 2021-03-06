import {UPDATE_PLAN, ROLLBACK_PLAN, SET_CURRENT_PLAN} from './plansConstant';
//const initialState

export default function reducer(state, action){
  switch (action.type) {
    case UPDATE_PLAN:
      if(state._id !== action.planId){
        return state;
      }
      return {
        ...state,
        pre: state.pre || {[action.field]: state[action.field]},  //save the pre data
        [action.field]: action.data
      };
    case ROLLBACK_PLAN:
      if(state._id !== action.planId){
        return state;
      }
      return {
        ...state,
        [action.field]: state.pre[action.field],
        pre: {} //clear the pre data
      };
    case SET_CURRENT_PLAN:
      if(state._id !== action.planId){
        return {
          ...state,
          isCurrent: false
        };
      }
      return {
        ...state,
        isCurrent: true
      };
    default:
      return state;
  }
  
}
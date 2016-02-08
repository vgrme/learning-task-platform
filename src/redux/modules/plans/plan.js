import {UPDATE_PLAN_NAME, SET_CURRENT_PLAN} from './plansConstant';
//const initialState

export default function reducer(state, action){
  switch (action.type) {
    case UPDATE_PLAN_NAME:
      if(state.id !== action.planId){
        return state;
      }
      return {
        ...state,
        name: action.planName
      };
    case SET_CURRENT_PLAN:
      if(state.id !== action.planId){
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
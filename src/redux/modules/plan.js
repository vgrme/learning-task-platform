import {UPDATE_PLAN_NAME} from '../constants/plansConstant';
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
    default:
      return state;
  }
  
}
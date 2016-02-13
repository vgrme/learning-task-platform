import {UPDATE_TASK, ROLLBACK_TASK, SET_CURRENT_TASK} from './constant';
//const initialState

export default function reducer(state, action){
  switch (action.type) {
    case UPDATE_TASK:
      if(state._id !== action.taskId){
        return state;
      }
      return {
        ...state,
        pre: state.pre || {[action.field]: state[action.field]},  //save the pre data
        [action.field]: action.data
      };
    case ROLLBACK_TASK:
      if(state._id !== action.taskId){
        return state;
      }
      return {
        ...state,
        [action.field]: state.pre[action.field],
        pre: {} //clear the pre data
      };
    case SET_CURRENT_TASK:
      if(state._id !== action.taskId){
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
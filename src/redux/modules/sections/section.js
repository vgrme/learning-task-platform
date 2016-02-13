import {UPDATE_SECTION, ROLLBACK_SECTION,
        SELECT_SECTION, UN_SELECT_SECTION,
        ACTIVATE_SECTION, DE_ACTIVATE_SECTION} from './sectionsConstant';
//const initialState

export default function reducer(state, action){
  switch (action.type) {
    case UPDATE_SECTION:
      if(state._id !== action.sectionId){
        return state;
      }
      return {
        ...state,
        pre: state.pre || {[action.field]: state[action.field]},  //save the pre data
        [action.field]: action.data
      };
    case ROLLBACK_SECTION:
      if(state._id !== action.sectionId){
        return state;
      }
      return {
        ...state,
        [action.field]: state.pre[action.field],
        pre: {} //clear the pre data
      };
    case SELECT_SECTION:
      if(state._id !== action.sectionId){
        return {...state, isCurrent: false};
      }
      return {...state, isCurrent: true};
    case UN_SELECT_SECTION:
      return {...state, isCurrent: false};
    case ACTIVATE_SECTION:
      if(state._id !== action.sectionId){
        return {...state, isActive: false};
      }
      return {...state, isActive: true};
    case DE_ACTIVATE_SECTION:
      return {...state, isActive: false};
    default:
      return state;
  }
  
}
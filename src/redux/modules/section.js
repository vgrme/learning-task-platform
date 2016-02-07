import {UPDATE_SECTION_NAME} from '../constants/sectionsConstant';
//const initialState

export default function reducer(state, action){
  switch (action.type) {
    case UPDATE_SECTION_NAME:
      if(state.id !== action.sectionId){
        return state;
      }
      return {
        ...state,
        name: action.sectionName
      };
    default:
      return state;
  }
  
}
import * as plansService from 'services/plans';
import section from './section';
import {LOAD, UPDATE_SECTION_NAME} from '../constants/sectionsConstant';

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case LOAD:
      return plansService.getSections();
    case UPDATE_SECTION_NAME:
      return state.map(s=> section(s, action));
    default:
      return state;
  }
}

export function loadSections(){
  return {
    type: LOAD
  };
}

export function updateSectionName(sectionId, sectionName){
  return {
    type: UPDATE_SECTION_NAME,
    sectionId,
    sectionName
  };
}
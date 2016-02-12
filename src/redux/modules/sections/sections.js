import * as plansService from 'services/planService';
import section from './section';
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, 
        SAVE, SAVE_SUCCESS, SAVE_FAIL,
        SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL,  
        SELECT_SECTION, UN_SELECT_SECTION,
        UPDATE_SECTION, ROLLBACK_SECTION, 
        ADD_SECTION, STOP_ADD_SECTION} from './sectionsConstant';

const initialState = {
  showCurrent: false,
  currentSectionId: null,
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
        list: plansService.getOrderedSections(action.result),
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
        list: plansService.findAndReplaceSection(state.liat, action.result),
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
        list: plansService.getOrderedSections(action.result),
        newSection: null,
        saving: false,
        saved: true
      };
    case UPDATE_SECTION:
      if(!action.sectionId){
        return {
          ...state,
          newSection: {...state.newSection,[action.field]: action.data}
        }
      }
      return {
        ...state,
        list: state.list.map(s=> section(s, action))
      };
    case ROLLBACK_SECTION:
      return {
        ...state,
        list: state.list.map(s=> section(s, action))
      };
    case ADD_SECTION:
      return {
        ...state,
        newSection: {name: '', active: true, order: 1}
      };
    case STOP_ADD_SECTION:
      return {
        ...state,
        newSection: null
      };
    case SELECT_SECTION:
      return {
        ...state,
        list: state.list.map(s=> section(s, action)),
        showCurrent: action.showCurrent,
        currentSectionId: action.sectionId
      };
    case UN_SELECT_SECTION:
      return {
        ...state,
        list: state.list.map(s=> section(s, action)),
        showCurrent: false
      };
    default:
      return state;
  }
}

export function loadSections(){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/learning/sections')
  };
}

export function updateSectionName(sectionId, sectionName){
  return {
    type: UPDATE_SECTION,
    sectionId,
    field: 'name',
    data: sectionName
  };
}

export function rollbackSectionName(sectionId){
  return {
    type: ROLLBACK_SECTION,
    sectionId,
    field: 'name'
  }
}

export function addSection(){
  return {
    type: ADD_SECTION
  }
}

export function stopAddSection(){
  return {
    type: STOP_ADD_SECTION
  }
}

export function selectSection(sectionId, showCurrent){
  return {
    type: SELECT_SECTION,
    sectionId,
    showCurrent
  }
}

export function unSelectSection(){
  return {
    type: UN_SELECT_SECTION
  }
}

export function saveAllSections(sections, reason){
  return {
    types: [SAVE, SAVE_ALL_SUCCESS, SAVE_FAIL],
    reason,
    promise: (client) => client.post('/api/learning/sections/many',{data:sections})
  }
}

export function saveSection(section){
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    isNew: !section._id,
    promise: (client) => client.post('/api/learning/sections',{data:section})
  };
}
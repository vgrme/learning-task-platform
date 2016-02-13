import * as plansService from 'services/planService';
import task from './task';
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, 
        SAVE, SAVE_SUCCESS, SAVE_FAIL, 
        SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL,
        ADD_TASK, STOP_ADD_TASK,
        UPDATE_TASK, ROLLBACK_TASK, SET_CURRENT_TASK} from './constant';

const initialState = {
  showCurrent: false,
  currentTaskId: null,
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
        list: plansService.findAndReplaceById(state.list, action.replaceWithResult?action.result:action.task),
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
        list: plansService.getOrderedArray(action.result),
        newTask: null,
        saving: false,
        saved: true
      };
    case UPDATE_TASK:
      if(!action.taskId){
        return {
          ...state,
          newTask: {...state.newTask,[action.field]: action.data}
        }
      }
      return {
        ...state,
        list: state.list.map(p=>task(p, action))
      };
    case ROLLBACK_TASK:
      return {
        ...state,
        list: state.list.map(p=> task(p, action))
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        showCurrent: true,
        currentTaskId: action.taskId,
        list: state.list.map(p=>task(p, action))
      };
    case ADD_TASK:
      return {
        ...state,
        newTask: {name: '', active: true, order: 1, planId: action.planId}
      };
    case STOP_ADD_TASK:
      return {
        ...state,
        newTask: null
      };
    default:
      return state;
  }
}

export function loadTasks(sectionId, planId){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/api/learning/tasks/${sectionId}/${planId}`)
  };
}

export function updateTaskName(taskId, taskName){
  return {
    type: UPDATE_TASK,
    taskId,
    field: 'name',
    data: taskName
  };
}

export function rollbackTaskName(taskId){
  return {
    type: ROLLBACK_TASK,
    taskId,
    field: 'name'
  }
}

export function selectTask(taskId){
  return {
    type: SET_CURRENT_TASK,
    taskId: taskId
  };
}

export function addTask(planId){
  return {
    type: ADD_TASK,
    planId
  }
}

export function stopAddTask(){
  return {
    type: STOP_ADD_TASK
  }
}

export function changeTaskCompleteValue(task, sectionId, planId){
  return saveTask({...task, complete: !task.complete}, sectionId, planId);
}


export function saveTask(task, sectionId, planId, replaceWithResult){
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    sectionId,
    planId,
    task,
    replaceWithResult,
    promise: (client) => client.post(`/api/learning/tasks/${sectionId}/${planId}`,{data:task})
  };
}

export function saveAllTasks(tasks, sectionId, planId, reason){
  return {
    types: [SAVE, SAVE_ALL_SUCCESS, SAVE_FAIL],
    sectionId,
    planId,
    reason,
    promise: (client) => client.post(`/api/learning/tasks/${sectionId}/${planId}/many`,{data:tasks})
  }
}
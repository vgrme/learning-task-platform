import * as plansService from 'services/planService';
import task from './task';
import {LOAD, LOAD_SUCCESS, LOAD_FAIL, 
        SAVE, SAVE_SUCCESS, SAVE_FAIL, 
        SAVE_ALL, SAVE_ALL_SUCCESS, SAVE_ALL_FAIL,
        ADD_TASK, STOP_ADD_TASK,
        ADD_BATCH_TASKS, STOP_ADD_BATCH_TASKS,
        UPDATE_TASK, ROLLBACK_TASK, SET_CURRENT_TASK} from './constant';

const initialState = {
  showCurrent: false,
  planId: null,
  currentTaskId: null,
  list: [],
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  addingBatchTasks: false
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
        list: plansService.getOrderedArray(action.result),
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
        addingBatchTasks: false,
        saving: false,
        saved: true
      };
    case UPDATE_TASK:
      if(!action.taskId){
        return {
          ...state,
          newTask: {...state.newTask,[action.field]: action.data}
        };
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
    case ADD_BATCH_TASKS:
      return {
        ...state,
        addingBatchTasks: true
      };
    case STOP_ADD_BATCH_TASKS:
      return {
        ...state,
        addingBatchTasks: false
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

export function saveTaskName(task, tasks, sectionId, planId){
  if(!task._id){
    if(!task.name){
      return stopAddTask();
    }
    else{
      var newTasksList = plansService.addTask(tasks, task);
      return saveAllTasks(newTasksList, sectionId, planId, 'addNew');
    }
  }
  else{
    if(!task.name){
      return rollbackTaskName(task._id);
    }
    else if(task.pre && task.name !== task.pre.name){
      return saveTask(task, sectionId, planId);
    }
    return {type: 'NO_CHANGE'};
  }
}

export function addBatchTasks(){
  return {
    type: ADD_BATCH_TASKS
  };
}

export function stopAddBatchTasks(){
  return {
    type: STOP_ADD_BATCH_TASKS
  };
}

export function saveBatchTasks(mainName, number, tasks, sectionId, planId){
  var batchTasks = plansService.generateBatchTasks(mainName, number, planId);
  var newTasksList = plansService.addTasks(tasks, batchTasks);
  return saveAllTasks(newTasksList, sectionId, planId, 'addNew');
}

export function rollbackTaskName(taskId){
  return {
    type: ROLLBACK_TASK,
    taskId,
    field: 'name'
  };
}

export function addTask(planId){
  return {
    type: ADD_TASK,
    planId
  };
}

export function stopAddTask(){
  return {
    type: STOP_ADD_TASK
  };
}

export function changeTaskCompleteValue(task, sectionId, planId){
  var newCompelete = !task.complete;
  var dateTimeCompleted = newCompelete? Date.now(): null;
  return saveTask({...task, complete: newCompelete, dateTimeCompleted: dateTimeCompleted}, sectionId, planId);
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
  };
}
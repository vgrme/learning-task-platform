import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {tasksActions} from 'redux/modules';
import {TaskRow} from 'components';
import * as plansService from 'services/planService';


@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
    newTask: state.tasks.newTask
  }),
  { ...tasksActions })
export default class TasksList extends Component {
  static propTypes = {
  };


  render() {
    const {currentPlanId, currentSectionId, tasks, newTask} = this.props;
    const {updateTaskName, rollbackTaskName, saveTask, saveAllTasks, stopAddTask,
           changeTaskCompleteValue} = this.props; //from tasksActions

    const handleNewTaskBlur = (task) => {
      if(task.name){
        var newTasksList = plansService.addTask(tasks, task);
        saveAllTasks(newTasksList, currentSectionId, currentPlanId, 'addNew');
      }
      else{
        stopAddTask();
      }
    };

    const handleTaskBlur = (task) => {
      if(!task.name){
        rollbackTaskName(task._id);
      }
      else if(task.pre && task.name !== task.pre.name){
        saveTask(task, currentSectionId, currentPlanId);
      }
    };

    return (
      <div>
        <div>
          {
            !newTask?'':
            <TaskRow task={newTask} onTextChange={updateTaskName} 
                        onTextBlur={handleNewTaskBlur} />
          }
        </div>
        <div>
          {tasks.map((t) => 
            <TaskRow task={t} onTextChange={updateTaskName} 
                     onTextBlur={handleTaskBlur} 
                     onCheck={()=>changeTaskCompleteValue(t,currentSectionId,currentPlanId)}/>
           )
          }
        </div>
      </div>
    );
  }
}

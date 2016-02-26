import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import update from 'react/lib/update';
import {tasksActions, plansActions} from 'redux/modules';
import {TaskRow, Cover} from 'components';
import * as plansService from 'services/planService';
import DragSortItem from '../Common/DragSortItem';

@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
    filter: state.filters.task,
    newTask: state.tasks.newTask,
    saved: state.tasks.saved
  }),
  { ...tasksActions, ...plansActions })
export default class TasksList extends Component {
  static propTypes = {
    currentPlanId: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    tasks: PropTypes.array,
    newTask: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if(!this.props.saved && nextProps.saved){ // task saved
      nextProps.loadPlansPercentageInfo(nextProps.currentPlanId);
    }
  }

  render() {
    const {currentPlanId, currentSectionId, tasks, newTask, filter} = this.props;
    const {updateTaskName, updateTaskDescription, saveTaskName, saveTaskDescription, 
           changeTaskCompleteValue, reorderTask, saveAllTasks} = this.props; //from tasksActions

    const handleSubmitName = (task) => {
      saveTaskName(task, tasks, currentSectionId, currentPlanId);
    };

    const handleSubmitDescription = (task) =>{
      saveTaskDescription(task, currentSectionId, currentPlanId);
    };

    const moveItem = (dragIndex, hoverIndex) => {
      const dragItem = tasks[dragIndex];

      var newTasks = update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem]
          ]
        });
      
      reorderTask(newTasks);
    };

    const saveTasksOrder = () => {
      const newTasksList = tasks.map((t, i) => {
        t.order = i+1;
        return t;
      });
      saveAllTasks(newTasksList, currentSectionId, currentPlanId, 'reorder');
    };

    const showTask = (task) => {
      if(filter === 'All') return true;
      else if(filter === 'Complete') return task.complete;
      else return !task.complete;
    };

    return (
      <div>
        <div>
          {
            !newTask?'':
            <TaskRow task={newTask} onNameChange={updateTaskName} autoFocus={true}
                     onSubmitName={()=>handleSubmitName(newTask)} />
          }
        </div>
        <div className="relative">
          {!newTask?'':<Cover />}
          {
            tasks.map((t, i) => 
            <div key={t._id}>
              {!showTask(t)?'':
                <DragSortItem type="task" index={i} id={t._id} dragHandle={true}
                              moveItem={moveItem} saveItems={saveTasksOrder}>
                  <TaskRow task={t} onNameChange={updateTaskName} onDescriptionChange={updateTaskDescription}
                         onSubmitName={()=>handleSubmitName(t)} onSubmitDescription={()=>handleSubmitDescription(t)}
                         onCheck={()=>changeTaskCompleteValue(t,currentSectionId,currentPlanId)}/>
                </DragSortItem>
              }
            </div>
           )
          }
        </div>
      </div>
    );
  }
}

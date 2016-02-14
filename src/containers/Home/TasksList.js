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
    currentPlanId: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    tasks: PropTypes.array,
    newTask: PropTypes.object
  };


  render() {
    const {currentPlanId, currentSectionId, tasks, newTask} = this.props;
    const {updateTaskName, saveTaskName, changeTaskCompleteValue} = this.props; //from tasksActions

    const handleTaskBlur = (task) => {
      saveTaskName(task, tasks, currentSectionId, currentPlanId);
    };

    return (
      <div>
        <div>
          {
            !newTask?'':
            <TaskRow task={newTask} onTextChange={updateTaskName} autoFocus={true}
                     onTextBlur={handleTaskBlur} />
          }
        </div>
        <div>
          {tasks.map((t) => 
            <TaskRow key={t._id} task={t} onTextChange={updateTaskName} 
                     onTextBlur={handleTaskBlur} 
                     onCheck={()=>changeTaskCompleteValue(t,currentSectionId,currentPlanId)}/>
           )
          }
        </div>
      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {tasksActions, plansActions} from 'redux/modules';
import {TaskRow} from 'components';
import * as plansService from 'services/planService';


@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    tasks: state.tasks.list,
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
    const {currentPlanId, currentSectionId, tasks, newTask} = this.props;
    const {updateTaskName, updateTaskDescription, saveTaskName, saveTaskDescription, 
           changeTaskCompleteValue} = this.props; //from tasksActions

    const handleSubmitName = (task) => {
      saveTaskName(task, tasks, currentSectionId, currentPlanId);
    };

    const handleSubmitDescription = (task) =>{
      saveTaskDescription(task, currentSectionId, currentPlanId);
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
        <div>
          {tasks.map((t) => 
            <TaskRow key={t._id} task={t} onNameChange={updateTaskName} onDescriptionChange={updateTaskDescription}
                     onSubmitName={()=>handleSubmitName(t)} onSubmitDescription={()=>handleSubmitDescription(t)}
                     onCheck={()=>changeTaskCompleteValue(t,currentSectionId,currentPlanId)}/>
           )
          }
        </div>
      </div>
    );
  }
}

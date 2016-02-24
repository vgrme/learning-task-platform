import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, tasksActions} from 'redux/modules';
import {PlanTitle, PlanProgress, SaveNotice} from 'components';
import PlanActionBar from './PlanActionBar';
import TasksList from './TasksList';
import Filter from './Filter';


@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    plans: state.plans.list,
    tasks: state.tasks.list,
    taskSaving: state.tasks.saving, 
    taskSaved: state.tasks.saved, 
    taskError: state.tasks.error
  }),
  { ...plansActions, ...tasksActions })
export default class SideDetails extends Component {
  static propTypes = {
    currentPlanId: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    plans: PropTypes.array,
    loadTasks: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadTasks(this.props.currentSectionId, this.props.currentPlanId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentPlanId !== nextProps.currentPlanId) {
      this.props.loadTasks(nextProps.currentSectionId, nextProps.currentPlanId);
    }
  }

  render() {
    const {currentPlanId, plans, tasks} = this.props;
    const {rollbackPlanName, savePlan} = this.props;

    const currentPlan = plans.find(p=>p._id === currentPlanId);

    const getSaveMode = ()=>{
      const {taskSaving, taskSaved, taskError} = this.props;
      if(taskSaving){
        return 'saving';
      }
      else if (taskSaved){
        return 'saved';
      }
      else if (taskError){
        return 'error';
      }
      return '';
    };

    return (
      <div>
        <PlanTitle plan={currentPlan}/>
        <PlanProgress tasks={tasks}/>
        <PlanActionBar plan={currentPlan} />
        <Filter filterKey="task"/>
        <SaveNotice mode={getSaveMode()}/>
        <TasksList />
      </div>
    );
  }
}

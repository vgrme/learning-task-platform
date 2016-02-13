import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, tasksActions} from 'redux/modules';
import {PlanTitle} from 'components';
import PlanActionBar from './PlanActionBar';
import TasksList from './TasksList';


@connect(
  state => ({
    currentPlanId: state.plans.currentPlanId,
    currentSectionId: state.plans.currentSectionId,
    showCurrentPlan: state.plans.showCurrent,
    plans: state.plans.list
  }),
  { ...plansActions, ...tasksActions })
export default class SideDetails extends Component {
  static propTypes = {
    updatePlanName: PropTypes.func.isRequired,
    selectPlan: PropTypes.func
  };

  componentDidMount() {
    this.props.loadTasks(this.props.currentSectionId, this.props.currentPlanId);
  }

  render() {
    const {currentPlanId, plans} = this.props;

    //const tasks = plansService.getTasksByPlanId(currentPlanId);

    const currentPlan = plans.find(p=>p._id === currentPlanId);

    const handlePlanBlur = (plan) => {
      if(!plan.name){
        this.props.rollbackPlanName(plan._id);
      }
      else if(plan.pre && plan.name !== plan.pre.name){
        this.props.savePlan(plan, plan.sectionId);
      }
    };

    return (
      <div>
        <PlanTitle plan={currentPlan} onTextChange={this.props.updatePlanName} 
                   onTextBlur={handlePlanBlur}/>
        <PlanActionBar plan={currentPlan} />
        <TasksList />
      </div>
    );
  }
}

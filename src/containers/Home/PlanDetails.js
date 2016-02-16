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
    plans: state.plans.list
  }),
  { ...plansActions, ...tasksActions })
export default class SideDetails extends Component {
  static propTypes = {
    currentPlanId: PropTypes.string.isRequired,
    currentSectionId: PropTypes.string.isRequired,
    plans: PropTypes.array,
    loadTasks: PropTypes.func.isRequired,
    updatePlanName: PropTypes.func.isRequired,
    rollbackPlanName: PropTypes.func.isRequired,
    savePlan: PropTypes.func.isRequired
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
    const {currentPlanId, plans} = this.props;
    const {rollbackPlanName, savePlan, updatePlanName} = this.props;

    const currentPlan = plans.find(p=>p._id === currentPlanId);

    const handlePlanBlur = (plan) => {
      if(!plan.name){
        rollbackPlanName(plan._id);
      }
      else if(plan.pre && plan.name !== plan.pre.name){
        savePlan(plan, plan.sectionId);
      }
    };

    return (
      <div>
        <PlanTitle plan={currentPlan} onTextChange={updatePlanName} 
                   onTextBlur={handlePlanBlur}/>
        <PlanActionBar plan={currentPlan} />
        <TasksList />
      </div>
    );
  }
}

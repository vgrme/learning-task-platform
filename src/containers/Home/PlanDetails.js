import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/plans';
import {plansActions} from 'redux/modules';
import {PlanTitle, TasksList} from 'components';


@connect(
  state => ({
    currentPlan: state.plans.currentPlan,
    showCurrentPlan: state.plans.showCurrent
  }),
  { ...plansActions })
export default class SideDetails extends Component {
  static propTypes = {
    updatePlanName: PropTypes.func.isRequired,
    selectPlan: PropTypes.func
  };

  render() {

    const paperStyle = {
      padding: '20px'
    };

    const getTasks = () => {
      return plansService.getTasksByPlanId(this.props.currentPlan.id);
    };

    return (
      <div>
        <PlanTitle plan={this.props.currentPlan} onTextChange={this.props.updatePlanName}/>
        <TasksList tasks={getTasks()}/>
      </div>
    );
  }
}

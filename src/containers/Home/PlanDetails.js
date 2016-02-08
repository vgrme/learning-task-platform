import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {plansActions} from 'redux/modules';
import {PlanTitle} from 'components';


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

    return (
      <div>
        <PlanTitle plan={this.props.currentPlan} onTextChange={this.props.updatePlanName}/>
      </div>
    );
  }
}

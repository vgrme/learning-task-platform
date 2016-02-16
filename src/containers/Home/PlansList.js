import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {plansActions} from 'redux/modules';

import {PlanRow} from 'components';

@connect(
  state => ({
    newPlan: state.plans.newPlan,
    percentageInfo: state.plans.percentageInfo,
    currentPlanId: state.plans.currentPlanId,
    tasks: state.tasks.list
  }),
  {...plansActions })
export default class PlansList extends Component {
  static propTypes = {
    plans: PropTypes.array,
    sectionId: PropTypes.string.isRequired,
    updatePlanName: PropTypes.func.isRequired,
    selectPlan: PropTypes.func.isRequired
  };

  render() {
    const {plans, sectionId, newPlan, tasks, currentPlanId, percentageInfo} = this.props;
    const {savePlanName, selectPlan, updatePlanName} = this.props;  //from plansActions

    const percentage = {
      ...percentageInfo,
      [currentPlanId]: tasks.filter(t=>t.complete).length / tasks.length*100
    };

    return (
      <div>
        <div>
          {
            !newPlan || newPlan.sectionId!==sectionId?'':
            <PlanRow plan={newPlan} onTextChange={updatePlanName} autoFocus={true}
                        onTextBlur={()=>savePlanName(newPlan, plans)} />
          }
        </div>
        <div>
          {plans.map((p) => 
            <PlanRow key={p._id} plan={p} percentage={percentage[p._id]} onTextChange={updatePlanName} onPlanClick={selectPlan}
                     onTextBlur={()=>savePlanName(p, plans)} />
           )
          }
        </div>
      </div>
    );
  }

}
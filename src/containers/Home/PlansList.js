import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {plansActions} from 'redux/modules';

import {PlanRow} from 'components';

@connect(
  state => ({
    newPlan: state.plans.newPlan
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
    const {plans, sectionId, newPlan} = this.props;
    const {savePlanName, selectPlan, updatePlanName} = this.props;  //from plansActions


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
            <PlanRow key={p._id} plan={p} onTextChange={updatePlanName} onPlanClick={selectPlan}
                     onTextBlur={()=>savePlanName(p, plans)} />
           )
          }
        </div>
      </div>
    );
  }

}
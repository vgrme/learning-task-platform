import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/plans';
import {plansActions, sectionsActions} from 'redux/modules';

import {PlansList, SectionRow} from 'components';

@connect(
  state => ({
    sections: state.sections,
    plans: state.plans.list,
    filter: state.filter
  }),
  {...plansActions, ...sectionsActions })
export default class HomePlansList extends Component {
  static propTypes = {
    sections: PropTypes.array,
    plans: PropTypes.array,
    updatePlanName: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired,
    selectPlan: PropTypes.func.isRequired
  };

  render() {

    const getGroupedPlans = () => {
      return plansService.getGroupedPlans(this.props.plans, this.props.sections);
    };

    return (
      <div>
        {getGroupedPlans().map((row)=> 
            <div key={row.section.id}>
              <SectionRow section={row.section} onTextChange={this.props.updateSectionName}/>
              <PlansList plans={row.plans} onTextChange={this.props.updatePlanName} onPlanClick={this.props.selectPlan}/>
            </div>
          )
        }
      </div>
    );
  }

}
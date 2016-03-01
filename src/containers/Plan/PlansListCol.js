import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, filterActions} from 'redux/modules';
import {OutlineButton, DropDownFilter, SaveNotice} from 'components';
import PlansList from './PlansList';

@connect(
  state => ({
    currentSectionId: state.sections.currentSectionId,
    plans: state.plans.list,
    filter: state.filters.plan,
    filters: state.filters,
    planSaving: state.plans.saving,
    planSaved: state.plans.saved,
    planError: state.plans.error
  }),
  {...plansActions, ...filterActions })
export default class PlansListCol extends Component {
  static propTypes = {
    plans: PropTypes.array
  };

  render() {
    const {currentSectionId, filter, filters} = this.props;
    const {addPlan, setFilter} = this.props;  //from sectionsActions

    const plans = plansService.getOrderedPlansBySection(this.props.plans, currentSectionId);

    const handleFilterChange = (value) => {
      setFilter('plan', value);
    };

    const getSaveMode = ()=>{
      const {planSaving, planSaved, planError} = this.props;
      if(planSaving){
        return 'saving';
      }
      else if (planSaved){
        return 'saved';
      }
      else if (planError){
        return 'error';
      }
      return '';
    };

    return (
      <div>
        <div className="clearfix">
          <div className="float-left" ><OutlineButton label="+ Plan" onClick={()=>addPlan(currentSectionId)}/></div>
          <div className="float-right">
            <DropDownFilter filterOptions={filterActions.FILTER_OPTIONS['plan']} filter={filters['plan']} 
                          onFilterChange={handleFilterChange} style={{marginTop: 5}}/>
          </div>
        </div>
        <SaveNotice mode={getSaveMode()}/>
        {!currentSectionId?'':<PlansList sectionId={currentSectionId} plans={plans} filter={filter}/>}
      </div>
    );
  }

}
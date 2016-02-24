import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, sectionsActions} from 'redux/modules';

import {PlanRow, SectionRow, SaveNotice} from 'components';
import PlansList from './PlansList';

@connect(
  state => ({
    sections: state.sections.list,
    plans: state.plans.list,
    newSection: state.sections.newSection,
    filter: state.filter,
    sectionSaving: state.sections.saving,
    sectionSaved: state.sections.saved,
    sectionError: state.sections.error,
    planSaving: state.plans.saving,
    planSaved: state.plans.saved,
    planError: state.plans.error
  }),
  {...plansActions, ...sectionsActions })
export default class HomePlansList extends Component {
  static propTypes = {
    sections: PropTypes.array,
    plans: PropTypes.array,
    newSection: PropTypes.object,
    saveSectionName: PropTypes.func.isRequired,
    activateSection: PropTypes.func.isRequired,
    deActivateSection: PropTypes.func.isRequired,
    changeSectionActiveValue: PropTypes.func.isRequired,
    updatePlanName: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired,
    addPlan: PropTypes.func.isRequired
  };

  render() {
    const {plans, sections, newSection} = this.props;
    const {saveSectionName, activateSection, deActivateSection, 
           updateSectionName, changeSectionActiveValue} = this.props;  //from sectionsActions
    const {addPlan} = this.props;  //from plansActions

    const getGroupedPlans = () => {
      return plansService.getGroupedPlans(plans, sections);
    };

    const onSectionHover = (sectionId) => {
      activateSection(sectionId);
    };

    const onMouseLeaveSectionList = () => {
      deActivateSection();
    };

    const getSaveMode = ()=>{
      const {sectionSaving, sectionSaved, sectionError} = this.props;
      const {planSaving, planSaved, planError} = this.props;
      if(sectionSaving || planSaving){
        return 'saving';
      }
      else if (sectionSaved || planSaved){
        return 'saved';
      }
      else if (sectionError || planError){
        return 'error';
      }
      return '';
    };

    return (
      <div>
        <SaveNotice mode={getSaveMode()}/>
        {
          !newSection?'':
          <SectionRow section={newSection} onTextChange={updateSectionName} autoFocus={true}
                      onTextBlur={()=>saveSectionName(newSection, sections)} hideArchive={true} />
        }
        <div onMouseLeave={onMouseLeaveSectionList}>
          {
            getGroupedPlans().map((row)=> 
              <div key={row.section._id} onMouseEnter={()=>onSectionHover(row.section._id)}>
                <SectionRow section={row.section} onTextChange={updateSectionName} 
                            onTextBlur={()=>saveSectionName(row.section, sections)} 
                            onArchiveClick={changeSectionActiveValue} onAddPlanClick={addPlan}/>
                <PlansList sectionId={row.section._id} plans={row.plans}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }

}
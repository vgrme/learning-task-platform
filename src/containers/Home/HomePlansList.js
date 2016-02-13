import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, sectionsActions} from 'redux/modules';

import Divider from 'material-ui/lib/divider';

import {PlansList, PlanRow, SectionRow} from 'components';
import AddSectionButton from './AddSectionButton';

@connect(
  state => ({
    sections: state.sections.list,
    plans: state.plans.list,
    newSection: state.sections.newSection,
    newPlan: state.plans.newPlan,
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

    const handleNewSectionBlur = (section) => {
      if(section.name){
        var sections = plansService.addSection(this.props.sections, section);
        this.props.saveAllSections(sections, 'addNew');
      }
      else{
        this.props.stopAddSection();
      }
    };

    const handleSectionBlur = (section) => {
      if(!section.name){
        this.props.rollbackSectionName(section._id);
      }
      else if(section.pre && section.name !== section.pre.name){
        this.props.saveSection(section);
      }
    };

    const handleNewPlanBlur = (sectionId) => {
      return (plan) => {
        if(plan.name){
          var plans = plansService.addPlan(this.props.plans, sectionId, plan);
          this.props.saveAllPlans(plans, sectionId, 'addNew');
        }
        else{
          this.props.stopAddPlan();
        }
      }
    };

    const handlePlanBlur = (sectionId) => {
      return (plan) => {
        if(!plan.name){
          this.props.rollbackPlanName(plan._id);
        }
        else if(plan.pre && plan.name !== plan.pre.name){
          this.props.savePlan(plan, sectionId);
        }
      }
    };

    const onSectionHover = (sectionId) => {
      this.props.activateSection(sectionId);
    };

    const onMouseLeaveSectionList = () => {
      this.props.deActivateSection();
    };

    return (
      <div>
        {
          !this.props.newSection?'':
          <SectionRow section={this.props.newSection} onTextChange={this.props.updateSectionName} 
                      onTextBlur={handleNewSectionBlur} hideArchive={true} />
        }
        <div onMouseLeave={onMouseLeaveSectionList}>
          {
            getGroupedPlans().map((row)=> 
              <div key={row.section._id} onMouseEnter={()=>onSectionHover(row.section._id)}>
                <SectionRow section={row.section} onTextChange={this.props.updateSectionName} 
                            onTextBlur={handleSectionBlur} onArchiveClick={this.props.changeSectionActiveValue} 
                            onAddPlanClick={this.props.addPlan}/>
                {!this.props.newPlan || this.props.newPlan.sectionId!==row.section._id?'':
                  <PlanRow plan={this.props.newPlan} onTextChange={this.props.updatePlanName} 
                           onTextBlur={handleNewPlanBlur(row.section._id)} />
                }
                <PlansList plans={row.plans} onTextChange={this.props.updatePlanName} onPlanClick={this.props.selectPlan}
                           onTextBlur={handlePlanBlur(row.section._id)}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }

}
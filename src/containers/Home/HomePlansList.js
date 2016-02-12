import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, sectionsActions} from 'redux/modules';

import {PlansList, SectionRow} from 'components';

@connect(
  state => ({
    sections: state.sections.list,
    plans: state.plans.list,
    newSection: state.sections.newSection,
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
      this.props.unSelectSection();
    };

    const handleSectionClick = (sectionId) => {
      this.props.selectSection(sectionId, false);
    };

    return (
      <div>
        {
          !this.props.newSection?'':<SectionRow section={this.props.newSection} onTextChange={this.props.updateSectionName} onTextBlur={handleNewSectionBlur}/>
        }
        {getGroupedPlans().map((row)=> 
            <div key={row.section._id}>
              <SectionRow section={row.section} onTextChange={this.props.updateSectionName} 
                          onTextBlur={handleSectionBlur} onSectionClick={handleSectionClick}/>
              <PlansList plans={row.plans} onTextChange={this.props.updatePlanName} onPlanClick={this.props.selectPlan}/>
            </div>
          )
        }
      </div>
    );
  }

}
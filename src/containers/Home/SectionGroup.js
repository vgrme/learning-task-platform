import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {plansActions, sectionsActions} from 'redux/modules';

import {SectionRow} from 'components';
import PlansList from './PlansList';

@connect(
  state => ({
   }),
  {...plansActions, ...sectionsActions })
export default class HomePlansList extends Component {
  static propTypes = {
    section: PropTypes.object,
    plans: PropTypes.array,
    saveSectionName: PropTypes.func.isRequired,
    changeSectionActiveValue: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired,
    addPlan: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  render() {
    const {plans, section, filter} = this.props;
    const {saveSectionName, updateSectionName, changeSectionActiveValue} = this.props;  //from sectionsActions
    const {addPlan} = this.props;  //from plansActions

    const handleMouseEnter = () => {
      this.setState({
        isActive: true
      });
    };

    const handleMouseLeave = () => {
      this.setState({
        isActive: false
      });
    };

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SectionRow section={section} onTextChange={updateSectionName} isActive={this.state.isActive}
                    onTextBlur={()=>saveSectionName(section)} 
                    onArchiveClick={()=>changeSectionActiveValue(section)} 
                    onAddPlanClick={()=>addPlan(section._id)}/>
        <PlansList sectionId={section._id} plans={plans} filter={filter}/>
      </div>
    );
  }

}
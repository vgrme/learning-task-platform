import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {sectionsActions} from 'redux/modules';

import {SectionRow, OutlineButton, Cover} from 'components';
import MainColSaveNotice from './MainColSaveNotice';
import Filter from './Filter';
import SectionGroup from './SectionGroup';

@connect(
  state => ({
    sections: state.sections.list,
    plans: state.plans.list,
    newSection: state.sections.newSection,
    filter: state.filters.section
  }),
  {...sectionsActions })
export default class HomePlansList extends Component {
  static propTypes = {
    sections: PropTypes.array,
    plans: PropTypes.array,
    newSection: PropTypes.object,
    saveSectionName: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired,
    addSection: PropTypes.func.isRequired
  };

  render() {
    const {plans, sections, filter, newSection} = this.props;
    const {saveSectionName, updateSectionName, addSection} = this.props;  //from sectionsActions

    const getGroupedPlans = () => {
      return plansService.getGroupedPlans(plans, sections, filter);
    };

    const showSection = (section) => {
      if(filter === 'All') return true;
      else if(filter === 'Active') return section.active;
      else return !section.active;
    };

    return (
      <div>
        <div className="clearfix">
          <div className="float-left" ><OutlineButton label="+ Section" onClick={addSection}/></div>
          <div className="float-right"><Filter filterKey="section"/></div>
        </div>
        <MainColSaveNotice />
        {
          !newSection?'':
          <SectionRow section={newSection} onTextChange={updateSectionName} autoFocus={true}
                      onTextBlur={()=>saveSectionName(newSection, sections)} />
        }
        <div className="relative">
          {!newSection?'':<Cover />}
          {
            getGroupedPlans().map((row)=> 
              <div key={row.section._id}>
                {!showSection(row.section)?'':
                  <SectionGroup section={row.section} plans={row.plans} filter={filter}/>
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }

}
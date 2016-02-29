import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {sectionsActions, filterActions} from 'redux/modules';
import {SectionRow, OutlineButton, Cover, DropDownFilter} from 'components';
import SectionPlanSaveNotice from './SectionPlanSaveNotice';
import SectionPlansList from './SectionPlansList';

@connect(
  state => ({
    sections: state.sections.list,
    plans: state.plans.list,
    newSection: state.sections.newSection,
    filter: state.filters.section,
    filters: state.filters
  }),
  {...sectionsActions, ...filterActions })
export default class SectionCol extends Component {
  static propTypes = {
    sections: PropTypes.array,
    plans: PropTypes.array,
    newSection: PropTypes.object,
    saveSectionName: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired,
    addSection: PropTypes.func.isRequired
  };

  render() {
    const {plans, sections, filter, filters, newSection} = this.props;
    const {saveSectionName, updateSectionName, addSection, setFilter} = this.props;  //from sectionsActions

    const getGroupedPlans = () => {
      return plansService.getGroupedPlans(plans, sections, filter);
    };

    const showSection = (section) => {
      if(filter === 'All') return true;
      else if(filter === 'Active') return section.active;
      else return !section.active;
    };

    const handleFilterChange = (value) => {
      setFilter('section', value);
    };

    return (
      <div>
        <div className="clearfix">
          <div className="float-left" ><OutlineButton label="+ Section" onClick={addSection}/></div>
          <div className="float-right">
            <DropDownFilter filterOptions={filterActions.FILTER_OPTIONS['section']} filter={filters['section']} 
                          onFilterChange={handleFilterChange} style={{marginTop: 5}}/>
          </div>
        </div>
        <SectionPlanSaveNotice />
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
                  <SectionPlansList section={row.section} plans={row.plans} filter={filter}/>
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }

}
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';
import * as plansActions from 'redux/modules/plans';
import * as sectionsActions from 'redux/modules/sections';
import * as filterActions from 'redux/modules/filter';
import {SectionPlansList, DropDownFilter, OutlineButton} from 'components';

import * as plansService from 'services/plans';

const filterOptions = ['All', 'Complete', 'Not Complete'];


@connect(
  state => ({
    sections: state.sections,
    plans: state.plans,
    filter: state.filter
  }),
  {...filterActions, ...plansActions, ...sectionsActions })
export default class MainPlansList extends Component {
  static propTypes = {
    sections: PropTypes.array,
    filter: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    updatePlanName: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired
  };

  render() {
    const handleFilterChange = (filter) => {
      const {setFilter} = this.props;
      setFilter(filter);
    };

    const handleAddSection = () => {
      console.log('click');
    };

    const getGroupedPlans = () => {
      return plansService.getGroupedPlans(this.props.plans, this.props.sections);
    };

    const paperStyle = {
      padding: '20px'
    };

    return (
      <Paper style={paperStyle} zDepth={2}>
        <OutlineButton label="+ Section" onClick={handleAddSection}/>
        <DropDownFilter filterOptions={filterOptions} filter={this.props.filter} onFilterChange={handleFilterChange}/>
        <SectionPlansList sections={getGroupedPlans()} 
                          onSectionTextChange={this.props.updateSectionName} 
                          onPlanTextChange={this.props.updatePlanName}/>
      </Paper>
    );
  }
}

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansActions from 'redux/modules/plans';
import {PlansList} from 'components';

const filterOptions = ['All', 'Complete', 'Not Complete'];


@connect(
  state => ({
    plans: state.plans.data,
    loaded: state.plans.loaded,
    filter: state.plans.filter
  }),
  {...plansActions })
export default class Home extends Component {
  static propTypes = {
    loadPlans: PropTypes.func.isRequired,
    plans: PropTypes.array,
    loaded: PropTypes.bool,
    filter: PropTypes.string,
    changePlanFilter: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const handleFilterChange = (filter) => {
      const {changePlanFilter} = this.props;
      changePlanFilter(filter);
    };

    return (
      <div>
        <div>Home</div>
        <PlansList filterOptions={filterOptions} filter={this.props.filter} plans={this.props.plans} 
                  onFilterChange={handleFilterChange}/>
      </div>
    );
  }
}

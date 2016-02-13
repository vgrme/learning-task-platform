import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {filterActions} from 'redux/modules';
import {DropDownFilter} from 'components';

const filterOptions = ['All', 'Complete', 'Not Complete'];


@connect(
  state => ({
    filter: state.filter
  }),
  {...filterActions})
export default class PlanFilter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
  };

  render() {
    const {filter} = this.props;
    const {setFilter} = this.props;

    return (
      <DropDownFilter filterOptions={filterOptions} filter={filter} onFilterChange={setFilter}/>
    );
  }
}

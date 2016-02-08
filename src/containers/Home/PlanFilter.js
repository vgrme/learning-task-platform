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
    filter: PropTypes.string,
    setFilter: PropTypes.func.isRequired
  };

  render() {

    return (
      <DropDownFilter filterOptions={filterOptions} filter={this.props.filter} onFilterChange={this.props.setFilter}/>
    );
  }
}

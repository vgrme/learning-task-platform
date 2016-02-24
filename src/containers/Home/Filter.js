import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {filterActions} from 'redux/modules';
import {DropDownFilter} from 'components';

@connect(
  state => ({
    filters: state.filters
  }),
  {...filterActions})
export default class Filter extends Component {
  static propTypes = {
    filterKey: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired
  };

  render() {
    const {filterKey, filters} = this.props;
    const {setFilter} = this.props;

    const handleFilterChange = (value) => {
      setFilter(filterKey, value);
    };

    return (
      <DropDownFilter filterOptions={filterActions.FILTER_OPTIONS[filterKey]} filter={filters[filterKey]} onFilterChange={handleFilterChange}/>
    );
  }
}

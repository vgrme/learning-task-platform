import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const PlansList = (props) => {
  const onFilterChange = function(event, index, value){
    props.onFilterChange(value);
    console.log(value);
  };

  return (
    <div>
      <SelectField value={props.filter} onChange={onFilterChange}>
      {
        props.filterOptions.map((f) => <MenuItem key={f} value={f} primaryText={f}/>)
      }
      </SelectField>
      <ul>
      {
        props.plans.map((plan) => plan.name) 
      }
      </ul>
    </div>
  );

};

PlansList.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  plans: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default PlansList;
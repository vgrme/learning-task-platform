import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const DropDownFilter = (props) => {
  const onFilterChange = function(event, index, value){
    props.onFilterChange(value);
    //console.log(value);
  };

  return (
    <div>
      <SelectField value={props.filter} onChange={onFilterChange}>
      {
        props.filterOptions.map((f) => <MenuItem key={f} value={f} primaryText={f}/>)
      }
      </SelectField>
    </div>
  );

};

DropDownFilter.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default DropDownFilter;
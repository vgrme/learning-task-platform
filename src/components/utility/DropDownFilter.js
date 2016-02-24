import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

const DropDownFilter = (props) => {
  const {filter, filterOptions} = props;

  const handleSelectChange = (event, index, value) => {
    props.onFilterChange(value);
  };

  return (
    <div>
      <SelectField value={filter} onChange={handleSelectChange}>
      {
        filterOptions.map((f) => <MenuItem key={f} value={f} primaryText={f}/>)
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
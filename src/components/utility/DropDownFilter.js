import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';

const DropDownFilter = (props) => {
  const {filter, filterOptions} = props;

  const style = {
    width: 80,
    borderBottom: '1px dashed ' + Colors.grey300,
    height: 20,
    fontSize: 14,
    ...props.style
  };

  const labelStyle = {
    height: '100%',
    lineHeight: 'inherit',
    paddingRight: 0
  };

  const iconStyle = {
    display: 'none'
  };

  const menuItemStyle = {
    fontSize: 14
  };

  const menuInnerStyle = {
    paddingLeft: 10,
    paddingRight: 10
  };

  const handleSelectChange = (event, index, value) => {
    props.onFilterChange(value);
  };

  return (
    <SelectField style={style} value={filter} onChange={handleSelectChange} underlineStyle={{display: 'none'}}
                labelStyle={labelStyle} iconStyle={iconStyle}>
    {
      filterOptions.map((f) => <MenuItem style={menuItemStyle} key={f} value={f} primaryText={f} 
                                         innerDivStyle={menuInnerStyle}/>)
    }
    </SelectField>
  );

};

DropDownFilter.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default DropDownFilter;
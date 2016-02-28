import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';

const SearchBar = (props) => {
  const {text, onSearchTextChange} = props;

  const style = {
    width: 200,
    height: 20,
    border: '1px solid ' + Colors.brown500,
    borderRadius:'15px',
    padding: 3,
    margin: 12,
    ...props.style
  };

  const iconStyle = {
    fontSize: 18,
    top: 2,
    color: Colors.brown500,
    marginRight: 5
  };

  const inputStyle = {
    width: 150,
    height: 20,
    lineHeight: '20px',
    fontSize: 14
  };

  const hintStyle = {
    bottom: 2
  };

  const handleTextChange = (event) => {
    if(onSearchTextChange){
      onSearchTextChange(event.target.value);
    }
  };

  return (
    <div style={style}>
      <FontIcon className="material-icons" style={iconStyle}>search</FontIcon>
      <TextField style={inputStyle} value={text} underlineShow={false} hintText="Search" hintStyle={hintStyle}
                 onChange={handleTextChange} />
    </div>
  );

};

SearchBar.propTypes = {

};

export default SearchBar;
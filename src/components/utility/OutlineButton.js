import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';

const OutlineButton = (props) => {
  const style = {
    border: '1px solid ' + Colors.brown500,
    fontSize: 14,
    lineHeight: '25px'
  };

  const labelStyle = {
    fontWeight: 200,
    color: Colors.brown500,
    padding: 10
  };

  return (
    <FlatButton style={style} label={props.label} labelStyle={labelStyle} onClick={props.onClick}/>
  );
  
};

OutlineButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default OutlineButton;
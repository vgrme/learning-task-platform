import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/lib/flat-button';

const OutlineButton = (props) => {
  const style = {
    border: '1px solid',
    borderColor: 'black'
  };

  return (
    <div>
      <FlatButton style={style} label={props.label} onClick={props.onClick}/>
    </div>
  );
  
};

OutlineButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default OutlineButton;
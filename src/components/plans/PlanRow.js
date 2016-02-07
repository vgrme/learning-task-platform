import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const PlanRow = (props) => {

  const planStyle = {
    basic: {
      marginLeft: 20
    },
    underlineStyle: {
      borderColor: Colors.orange500
    }
  };

  const handleTextChange = (event) => {
    if(props.onTextChange){
      props.onTextChange(props.plan.id, event.target.value);
    }
  };

  return (
    <div>
      <TextField value={props.plan.name} fullWidth={true}
                 inputStyle={planStyle.basic} underlineStyle={planStyle.underlineStyle} 
                 onChange={handleTextChange} />
    </div>
  );

};

PlanRow.propTypes = {
  plan: PropTypes.object.isRequired,
  onTextChange: PropTypes.func
};

export default PlanRow;
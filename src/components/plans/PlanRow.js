import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const PlanRow = (props) => {
  const {plan, autoFocus, onTextChange, onTextBlur, onPlanClick} = props;

  const planStyle = {
    basic: {
      marginLeft: 20
    },
    underlineStyle: {
      borderColor: Colors.orange500
    }
  };

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(plan._id, event.target.value);
    }
  };

  const handleClick = () => {
    if(onPlanClick){
      onPlanClick(plan);
    }
  };

  return (
    <div>
      <TextField value={plan.name} fullWidth={true} autoFocus={autoFocus}
                 inputStyle={planStyle.basic} underlineStyle={planStyle.underlineStyle} 
                 onChange={handleTextChange} onClick={handleClick}
                 onBlur={()=>onTextBlur(plan)} onEnterKeyDown={()=>onTextBlur(plan)}/>
    </div>
  );

};

PlanRow.propTypes = {
  plan: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onPlanClick: PropTypes.func
};

export default PlanRow;
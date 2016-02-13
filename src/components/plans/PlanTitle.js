import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';

const PlanTitle = (props) => {
  const {plan, onTextChange, onTextBlur} = props;

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(plan._id, event.target.value);
    }
  };


  return (
    <div>
      <TextField value={plan.name} fullWidth={true}
                 onChange={handleTextChange} onBlur={()=>onTextBlur(plan)}/>
    </div>
  );

};

PlanTitle.propTypes = {
  plan: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func
};

export default PlanTitle;
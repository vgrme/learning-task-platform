import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';

const PlanTitle = (props) => {
  const {plan} = props;

  const handleTextChange = (event) => {
    if(props.onTextChange){
      props.onTextChange(props.plan._id, event.target.value);
    }
  };


  return (
    <div>
      <TextField value={plan.name} fullWidth={true}
                 onChange={handleTextChange} onBlur={()=>props.onTextBlur(plan)}/>
    </div>
  );

};

PlanTitle.propTypes = {
  plan: PropTypes.object,
  onTextChange: PropTypes.func
};

export default PlanTitle;
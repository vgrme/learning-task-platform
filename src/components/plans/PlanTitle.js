import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const PlanTitle = (props) => {
  const {plan, onTextChange, onTextBlur} = props;

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(plan._id, event.target.value);
    }
  };

  const style={
    //borderBottom: '1px solid '+ Colors.grey300
  };


  return (
    <div style={style}>
      <TextField value={plan.name} fullWidth={true} onChange={handleTextChange} underlineShow={false}
                 onBlur={()=>onTextBlur(plan)} onEnterKeyDown={()=>onTextBlur(plan)}/>
    </div>
  );

};

PlanTitle.propTypes = {
  plan: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func
};

export default PlanTitle;
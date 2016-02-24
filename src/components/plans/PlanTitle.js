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
    fontSize: 18,
    marginBottom: 10
  };


  return (
    <div style={style}>
      {plan.name}
    </div>
  );

};

PlanTitle.propTypes = {
  plan: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func
};

export default PlanTitle;
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

  const style = {
    marginBottom: 10
  };

  const titleStyle={
    fontSize: 18,
    marginRight: 10,
    fontWeight: 400
  };


  return (
    <div style={style}>
      <span style={titleStyle}>{plan.name}</span>
      {plan.active? '': <span className="float-right">(archived)</span>}
    </div>
  );

};

PlanTitle.propTypes = {
  plan: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func
};

export default PlanTitle;
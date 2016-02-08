import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';

const PlanDetail = (props) => {

  const handleTextChange = (event) => {
    if(props.onTextChange){
      props.onTextChange(props.plan.id, event.target.value);
    }
  };


  return (
    <div>
      <TextField value={props.plan.name} fullWidth={true}
                 onChange={handleTextChange} />
    </div>
  );

};

PlanDetail.propTypes = {
  plan: PropTypes.object,
  onTextChange: PropTypes.func
};

export default PlanDetail;
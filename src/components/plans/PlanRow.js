import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';

const PlanRow = (props) => {
  const {plan, autoFocus, onTextChange, onTextBlur, onPlanClick} = props;

  const selectedStyle = {
    borderTop: '2px solid '+ '#BFAF80',
    borderBottom: '2px solid '+ '#BFAF80',
    marginLeft: -20,
    marginRight: -20
  }

  const style={
    borderTop: '1px solid '+ Colors.grey300,
    borderBottom: '1px solid '+ Colors.grey300,
    marginTop: 5,
    height: 30,
    ...(plan.isCurrent?selectedStyle:{})
  }

  const rowStyle = {
    height: 30
  };

  const selectedInputStyle = {
    //color: Colors.purple500,
    marginLeft: 40
  };

  const inputStyle = {
    marginLeft: 20,
    ...(plan.isCurrent?selectedInputStyle:{})
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
    <div style={style}>
      <TextField style={rowStyle} value={plan.name} autoFocus={autoFocus} 
                 inputStyle={inputStyle} fullWidth={true} underlineShow={false}
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
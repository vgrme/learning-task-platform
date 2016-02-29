import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Colors from 'material-ui/lib/styles/colors';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';

const PlanRow = (props) => {
  const {plan, percentage, autoFocus, onTextChange, onTextBlur, onPlanClick, deletePlan} = props;

  const selectedStyle = {
    borderTop: '2px solid '+ '#BFAF80',
    borderBottom: '2px solid '+ '#BFAF80'
  };

  const rowStyle={
    position: 'relative',
    borderTop: '1px solid '+ Colors.grey300,
    borderBottom: '1px solid '+ Colors.grey300,
    marginTop: 5,
    height: 30,
    ...(plan.isCurrent?selectedStyle:{})
  };

  const textStyle = {
    height: 30
  };

  const selectedInputStyle = {
    //color: Colors.purple500,
  };

  const inputStyle = {
    marginLeft: 5,
    ...(plan.isCurrent?selectedInputStyle:{})
  };

  const infoStyle = {
    position: 'absolute',
    right: -20,
    top: 8
  };

  const pctStyle = {
    position: 'absolute',
    right: 20,
    top: 10,
    fontSize: 12,
    fontWeight: 500,
    color: Colors.teal500
  };

  const menuStyle = {
    position: 'absolute',
    right: -20,
    top: 0
  };

  const menuIconStyle = {
    color: Colors.grey300,
    fontSize: 18
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
    <div style={rowStyle}>
      <TextField style={textStyle} value={plan.name} autoFocus={autoFocus} 
                 inputStyle={inputStyle} fullWidth={true} underlineShow={false}
                 onChange={handleTextChange} onClick={handleClick}
                 onBlur={()=>onTextBlur(plan)} onEnterKeyDown={()=>onTextBlur(plan)}/>
      {!percentage?'':<div style={pctStyle}>{percentage.toFixed(0)}%</div>}
    </div>
  );

};

/*
      <IconMenu style={menuStyle}
        iconButtonElement={<IconButton iconStyle={menuIconStyle} iconClassName="fa fa-angle-down" />}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Delete" />
        <MenuItem primaryText="Archive" />
      </IconMenu>
*/

PlanRow.propTypes = {
  plan: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onPlanClick: PropTypes.func
};

export default PlanRow;
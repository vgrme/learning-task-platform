import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

const TaskRow = (props) => {
  const {task, autoFocus, onTextChange, onTextBlur, onCheck} = props;

  const rowStyle = {
    position:'relative'
  };

  const checkBoxStyle = {
    width: '5%',
    display: 'block',
    float: 'left',
    marginTop: '8px'
  };

  const iconStyle = {
    fill: task.complete?Colors.brown100: Colors.brown400
  };

  const textStyle = {
    width: '95%',
    float: 'left',
    height: 40
  };

  const inputStyle = {
    color: task.complete?Colors.grey500: 'black'
  };

  const textUnderlineStyle = {
    borderColor: '#BFAF80'
  };

  const completedDateStyle = {
    position: 'absolute',
    right: 20,
    top: 28,
    fontSize: 10
  };

  const infoIconStyle = {
    btn: {
      position: 'absolute',
      right: -20,
      top: 0
    },
    icon:{
      color: Colors.grey300,
      fontSize: 18
    }
  };

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(task._id, event.target.value);
    }
  };

  return (
    <div className="clearfix" style={rowStyle}>
      <Checkbox style={checkBoxStyle} iconStyle={iconStyle} checked={task.complete} onCheck={onCheck}/>
      <TextField style={textStyle} inputStyle={inputStyle} value={task.name} fullWidth={true} 
                 onChange={handleTextChange} autoFocus={autoFocus} onBlur={()=>onTextBlur(task)} 
                 onEnterKeyDown={()=>onTextBlur(task)} underlineFocusStyle={textUnderlineStyle}/>
      
      {!task.dateTimeCompleted?'':
        <div style={completedDateStyle}>(Completed on {moment(task.dateTimeCompleted).format('MM-DD-YYYY')})</div>
      }
      <IconButton style={infoIconStyle.btn} iconStyle={infoIconStyle.icon} iconClassName="fa fa-angle-down" />
    
    </div>
  );

};

TaskRow.propTypes = {
  task: PropTypes.object,
  autoFocus: PropTypes.bool,
  onTextChange: PropTypes.func,
  onCheck: PropTypes.func
};

export default TaskRow;
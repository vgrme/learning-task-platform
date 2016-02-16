import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';

const TaskRow = (props) => {
  const {task, autoFocus, onTextChange, onTextBlur, onCheck} = props;

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

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(task._id, event.target.value);
    }
  };

  return (
    <div className="clearfix">
      <Checkbox style={checkBoxStyle} iconStyle={iconStyle} checked={task.complete} onCheck={onCheck}/>
      <TextField style={textStyle} inputStyle={inputStyle} value={task.name} fullWidth={true} 
                 onChange={handleTextChange} autoFocus={autoFocus} onBlur={()=>onTextBlur(task)} 
                 onEnterKeyDown={()=>onTextBlur(task)} underlineFocusStyle={textUnderlineStyle}/>
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
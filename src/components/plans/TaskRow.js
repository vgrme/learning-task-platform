import React, {Component, PropTypes} from 'react';

import TextField from 'material-ui/lib/text-field';

import Checkbox from 'material-ui/lib/checkbox';

const TaskRow = (props) => {
  const {task, autoFocus, onTextChange, onTextBlur, onCheck} = props;


  const checkBoxStyle = {
    width: '7%',
    display: 'block',
    float: 'left',
    marginTop: '12px'
  };

  const textStyle = {
    width: '93%',
    float: 'left'
  };

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(task._id, event.target.value);
    }
  };

  return (
    <div className="clearfix">
      <Checkbox style={checkBoxStyle} checked={task.complete} onCheck={onCheck}/>
      <TextField style={textStyle} value={task.name} fullWidth={true} onChange={handleTextChange} autoFocus={autoFocus}
                 onBlur={()=>onTextBlur(task)} onEnterKeyDown={()=>onTextBlur(task)}/>
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
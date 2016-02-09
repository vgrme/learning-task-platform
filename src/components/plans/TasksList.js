import React, {Component, PropTypes} from 'react';
import TaskRow from './TaskRow';

import TextField from 'material-ui/lib/text-field';

import Checkbox from 'material-ui/lib/checkbox';

const TasksList = (props) => {

  const colStyle = {
    padding: 0,
    borderBottom: '1px solid #e0e0e0',
    borderTop: '1px solid #e0e0e0'
  };

  const checkBoxColStyle = {
    ...colStyle,
    width: '24px'
  };

  const checkBoxStyle = {
    width: '4px'
  };

  const textColStyle = {
    height: '30px'
  };

  const handleTextChange = ()=>{

  };

  return (
    <table>
      <tbody>
      {
        props.tasks.map((t) => 
          <TaskRow task={t}></TaskRow>
        )
      }
      </tbody>
    </table>
    );

};

TasksList.propTypes = {
  tasks: PropTypes.array,
  onTextChange: PropTypes.func,
  onCheck: PropTypes.func
};

export default TasksList;
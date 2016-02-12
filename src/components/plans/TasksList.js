import React, {Component, PropTypes} from 'react';

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

  const handleRowClick = ()=>{

  };

  return (
    <table>
      <tbody>
      {
        props.tasks.map((t) => 
          <tr onClick={handleRowClick} onBlur={handleRowClick}>
            <td style={checkBoxColStyle}>
              <Checkbox style={checkBoxStyle}/>
            </td>
            <td style={colStyle}>
              <TextField value={this.props.task.name} style={textColStyle} underlineShow={false} onChange={handleTextChange} />
            </td>
          </tr>
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
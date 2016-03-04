import React, {Component, PropTypes} from 'react';
import Colors from 'material-ui/lib/styles/colors';
import TaskDescriptionText from './TaskDescriptionText';

export default class TaskRow extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  };

  render(){
    const {task} = this.props;

    const style = {
      padding: '0 10px',
      marginTop: 10
    };

    const nameStyle = {
      fontSize: 16,
      fontWeight: 400
    };

    const descriptionStyle = {
      padding: '5px 10px'
    };

    return (
      <div style={style}>
        <div style={nameStyle}>{task.name}</div>
        <TaskDescriptionText style={descriptionStyle} text={task.description} />
      </div>
    );
  }
}
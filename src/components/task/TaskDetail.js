import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TaskDescription from './TaskDescription';

export default class TaskDetail extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onDescriptionChange: PropTypes.func,
    onSubmitDescription: PropTypes.func
  };

  render(){
    const {task, onDescriptionChange, onSubmitDescription, onDeleteTask, show} = this.props;

    const completedDateStyle = {
      fontSize: 10,
      marginLeft: 10
    };

    const detailStyle = {
      width: '90%',
      margin: '3px auto'
    };

    const deleteIconStyle = {
      cursor: 'pointer'
    };

    return (
      <div>
        {!show?'':
          <div style={detailStyle}>
            <div>
            <i style={deleteIconStyle} className="fa fa-trash-o" onClick={onDeleteTask}></i>
            {!task.dateTimeCompleted?'':
              <span style={completedDateStyle}>(Completed on {moment(task.dateTimeCompleted).format('MM-DD-YYYY')})</span>
            }
            </div>
            <TaskDescription task={task} onDescriptionChange={onDescriptionChange} onSubmitDescription={onSubmitDescription} />
          </div>
        }
      </div>
    );
  }
}
import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import TaskDescription from './TaskDescription';

export default class TaskDetail extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onDescriptionChange: PropTypes.func,
    onSubmitDescription: PropTypes.func
  };

  render(){
    const {task, onDescriptionChange, onSubmitDescription, show} = this.props;

    const completedDateStyle = {
      fontSize: 10
    };

    const detailStyle = {
      width: '90%',
      margin: '3px auto'
    };

    return (
      <div>
        {!show?'':
          <div style={detailStyle}>
            <div>
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
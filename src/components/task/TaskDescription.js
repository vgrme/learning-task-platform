import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import TaskDescriptionText from './TaskDescriptionText';

export default class TaskDescription extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    onDescriptionChange: PropTypes.func,
    onSubmitDescription: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      showEdit: false,
      showBorder: false
    };
  }

  render(){
    const {task, onDescriptionChange, onSubmitDescription} = this.props;

    const fontSize = 14;
    const lineHeight = '18px';

    const style = {
      border: this.state.showBorder?'1px solid #BFAF80':'',
      position: 'relative'
    };

    const descriptionStyle = {
      padding: '0 3px 0 3px',
      fontSize,
      lineHeight
    };

    const textStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'white',
      padding: '0 3px 0 3px',
      marginTop: 12,
      overFlow: 'hidden',
      fontSize,
      lineHeight
    };

    const hintStyle = {
      top: 12,
      left: 5
    };

    const handleDescriptionTextChange = (event) => {
      if(onDescriptionChange){
        onDescriptionChange(task._id, event.target.value);
      }
    };

    const enterDescription = () => {
      this.setState({
        showBorder: true
      });
    };

    const leaveDescription = () => {
      this.setState({
        showBorder: false,
        showEdit: false
      });
    };

    const handleFocus = () => {
      this.setState({
        showEdit: true
      });
    };

    const handleBlur = () => {
      this.setState({
        showEdit: false
      });
    };

    return (
      <div style={style} onMouseEnter={enterDescription} onMouseLeave={leaveDescription} 
           onClick={handleFocus} onBlur={handleBlur}>
        <TextField style={descriptionStyle} value={task.description} multiLine={true} 
                   underlineShow={false} hintText="Description" hintStyle={hintStyle}
                   rows={2} fullWidth={true}
                   onChange={handleDescriptionTextChange} onBlur={onSubmitDescription} />
        {this.state.showEdit||!task.description?'':
            <TaskDescriptionText style={textStyle} text={task.description} />
        }
      </div>
    );
  }
}
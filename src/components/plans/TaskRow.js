import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

export default class TaskRow extends React.Component {
  static propTypes = {
    task: PropTypes.object,
    autoFocus: PropTypes.bool,
    onNameChange: PropTypes.func,
    onCheck: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      showDetail: false,
      enterDescription: false
    };
  }

  render(){
    const {task, autoFocus, onNameChange, onDescriptionChange, onSubmitName, onSubmitDescription, onCheck} = this.props;

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

    const detailStyle = {
      width: '90%',
      margin: '3px auto'
    };

    const descriptionStyle = {
      border: this.state.enterDescription?'1px solid #BFAF80':'',
      padding: '0 3px 0 3px'
    };

    const hintStyle = {
      top: 12,
      left: 5
    };

    const handleNameTextChange = (event) => {
      if(onNameChange){
        onNameChange(task._id, event.target.value);
      }
    };

    const handleDescriptionTextChange = (event) => {
      if(onDescriptionChange){
        onDescriptionChange(task._id, event.target.value);
      }
    };

    const handleDetailBtnClick = () => {
      this.setState({
        showDetail: !this.state.showDetail
      });
    };

    const enterDescription = () => {
      this.setState({
        enterDescription: true
      });
    };

    const leaveDescription = () => {
      this.setState({
        enterDescription: false
      });
    };

    return (
      <div>
        <div className="clearfix" style={rowStyle}>
          {!task._id?'':<Checkbox style={checkBoxStyle} iconStyle={iconStyle} checked={task.complete} 
                                  onCheck={onCheck}/>}
          <TextField style={textStyle} inputStyle={inputStyle} value={task.name} fullWidth={true} 
                     onChange={handleNameTextChange} autoFocus={autoFocus} onBlur={onSubmitName} 
                     onEnterKeyDown={onSubmitName} underlineFocusStyle={textUnderlineStyle}/>
          {!task._id?'':<IconButton style={infoIconStyle.btn} iconStyle={infoIconStyle.icon} iconClassName="fa fa-angle-down" 
                      onClick={handleDetailBtnClick}/>}
        </div>
        {!this.state.showDetail?'':
          <div style={detailStyle}>
            <div>
            {!task.dateTimeCompleted?'':
              <span style={completedDateStyle}>(Completed on {moment(task.dateTimeCompleted).format('MM-DD-YYYY')})</span>
            }
            </div>
            <TextField style={descriptionStyle} value={task.description} multiLine={true} 
                       underlineShow={false} hintText="Description" hintStyle={hintStyle}
                       rows={2} fullWidth={true} onMouseEnter={enterDescription} onMouseLeave={leaveDescription}
                       onChange={handleDescriptionTextChange} onBlur={onSubmitDescription} 
                       />
          </div>
        }
      </div>
    );
  }
}
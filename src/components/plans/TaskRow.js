import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';

export default class TaskRow extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    autoFocus: PropTypes.bool,
    onNameChange: PropTypes.func,
    onCheck: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render(){
    const {task, autoFocus, onNameChange, onSubmitName, onCheck, onDetailBtnClick} = this.props;

    const rowStyle = {
      position:'relative'
    };

    const checkBoxStyle = {
      width: '5%',
      display: 'block',
      float: 'left',
      marginTop: '8px'
    };

    const checkIconStyle = {
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


    const handleNameTextChange = (event) => {
      if(onNameChange){
        onNameChange(task._id, event.target.value);
      }
    };

    return (
      <div className="clearfix" style={rowStyle}>
        {!task._id?'':<Checkbox style={checkBoxStyle} iconStyle={checkIconStyle} checked={task.complete} 
                                onCheck={onCheck}/>}
        <TextField style={textStyle} inputStyle={inputStyle} value={task.name} fullWidth={true} 
                   onChange={handleNameTextChange} autoFocus={autoFocus} onBlur={onSubmitName} 
                   onEnterKeyDown={onSubmitName} underlineFocusStyle={textUnderlineStyle}/>
        {!task._id?'':<IconButton style={infoIconStyle.btn} iconStyle={infoIconStyle.icon} iconClassName="fa fa-angle-down" 
                    onClick={onDetailBtnClick}/>}
      </div>
    );
  }
}
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import Colors from 'material-ui/lib/styles/colors';

const TaskRow = React.createClass({

  propTypes: {
    task: PropTypes.object.isRequired,
    onTextChange: PropTypes.func
  },

  getInitialState() {
    return {
      isFocused: false
    };
  },


  render() {

    const borderColor = this.state.isFocused? Colors.blue500:Colors.grey500;

    const colStyle = {
      padding: 0,
      borderBottom: '1px solid '+borderColor,
      borderTop: '1px solid '+borderColor
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
      <tr onClick={()=>{this.setState({isFocused: true})}} onBlur={()=>{this.setState({isFocused: false})}}>
        <td style={checkBoxColStyle}>
          <Checkbox style={checkBoxStyle}/>
        </td>
        <td style={colStyle}>
          <TextField value={this.props.task.name} style={textColStyle} underlineShow={false} onChange={handleTextChange} />
        </td>
      </tr>
      );

  }

});


export default TaskRow;
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default class AddTasksModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: ''
    };
  }

  handleTextChange(field){
    return (event) => {
      this.setState({
        [field]: event.target.value
      });
    };
  }

  render() {
    const {open, onClose, onSubmit} = this.props;

    const labelStyle = {
      float: 'left',
      width: 110,
      margin: '20px 0 0 0'
    };

    const handleSubmit = ()=>{
      onSubmit(this.state.name, this.state.number);
      this.setState({name:'', number:''});
    };

    const actions = [
      <FlatButton key="c" label="Cancel" secondary={true} onTouchTap={onClose} />,
      <FlatButton key="s" label="Submit" primary={true} disabled={!this.state.name||!this.state.number} onTouchTap={handleSubmit} />
    ];

    return (
      <Dialog title="Add Multiple Tasks"
        actions={actions}
        modal={true}
        open={open}
      >
        <div>
          <span style={labelStyle}>Batch Name</span>
          <TextField value={this.state.name} onChange={this.handleTextChange('name')} />
        </div>
        <div>
          <span style={labelStyle}>Number of Tasks</span>
          <TextField value={this.state.number} onChange={this.handleTextChange('number')} />
        </div>
      </Dialog>
    );
  }
}
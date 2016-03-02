import React, {PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';

export default class LoginForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  render(){
    const {onSubmit, showError, onClickDemo} = this.props;

    const style = {
      height: 300,
      margin: '0 auto',
      width: '30%',
      minWidth: 400,
      textAlign: 'center',
      paddingTop: 15
    };

    const headerStyle = {
      fontSize: 16,
      fontWeight: 500,
      marginBottom: 15
    };

    const labelColStyle = {
      width: '15%',
      float: 'left',
      marginTop: '40px'
    };

    const inputStyle = {
      col:{
        width: '75%',
        float: 'left'
      },
      label:{
        color: Colors.grey500
      },
      underline:{
        borderColor: Colors.teal500
      }
    };

    const btnStyle = {
      margin: '30px 45px 0 0',
      float: 'right'
    };

    const tryDemoStyle = {
      marginTop: 60,
      color: Colors.green500,
      cursor: 'pointer'
    };

    const errorStyle = {
      color: Colors.red500,
      marginRight: 50,
      textAlign: 'right'
    };

    const handleEnterKey = (e) => {
      if(e.keyCode === 13)
        onSubmit(this.state.email, this.state.password);
    };

    return (
      <Paper style={style} zDepth={1} onKeyDown={handleEnterKey}>
        <div style={headerStyle}>Login</div>
        <Divider />
        <div className="clearfix">
          <FontIcon className="fa fa-user" style={labelColStyle} />
          <TextField value={this.state.email} style={inputStyle.col} hintText="" floatingLabelText="Username"
                     underlineFocusStyle={inputStyle.underline} floatingLabelStyle={inputStyle.label}
                     onChange={this.handleEmailChange}/>
        </div>
        <div className="clearfix">
          <FontIcon className="fa fa-key" style={labelColStyle} />
          <TextField value={this.state.password} style={inputStyle.col} hintText="" floatingLabelText="Password" type="password" 
                     underlineFocusStyle={inputStyle.underline} floatingLabelStyle={inputStyle.label}
                     onChange={this.handlePasswordChange}/>
        </div>
        {!showError?'':<div style={errorStyle}>Wrong username or password.</div>}
        <RaisedButton label="login" style={btnStyle} backgroundColor={Colors.teal500} labelColor="white"
                      onClick={()=>onSubmit(this.state.email, this.state.password)} 
                      disabled={!this.state.email||!this.state.password}/>
        <div style={tryDemoStyle} onClick={onClickDemo}>Do not have an account? Try demo.</div>
      </Paper>
    );
  }
  
}
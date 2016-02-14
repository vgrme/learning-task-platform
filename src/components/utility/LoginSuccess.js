import React, {PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';

export default class LoginSuccess extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }


  render(){
    const {onSubmit, user} = this.props;

    const style = {
      height: 200,
      margin: '0 auto',
      width: '30%',
      minWidth: 400,
      textAlign: 'center',
      padding: 20
    };

    const btnStyle = {
      margin: '50px auto'
    };

    const greetingStyle = {
      fontSize: 20
    };


    return (
      <Paper style={style} zDepth={1}>
        {user? <div style={greetingStyle}>Hello {user.name}!</div>: ''}
        <RaisedButton label="go to home page" style={btnStyle} backgroundColor={Colors.teal500} labelColor="white"
                      onClick={onSubmit} />
      </Paper>
    );
  }
  
}
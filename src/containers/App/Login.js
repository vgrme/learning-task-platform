import React, {Component, PropTypes, bindActionCreators} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'redux/modules';
import {LoginForm, LoginSuccess} from 'components';
import Colors from 'material-ui/lib/styles/colors';
import cookie from 'react-cookie';
import Paper from 'material-ui/lib/paper';

@connect(
  state => ({
    user: state.auth.user,
    token: state.auth.token
  }),
  {...authActions })
export default class Login extends Component {
  static propTypes = {
  };

  render() {
    const {user, token, login} = this.props;

    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      paddingTop: '15%',
      backgroundColor: Colors.lightGreen50
    };

    const cookieToken = cookie.load('token');

    const toHomePage = () => {
      this.props.history.pushState(null, '/');
    };

    return (
      <div style={style}>
        {!cookieToken?<LoginForm onSubmit={login}/>:<LoginSuccess user={user} onSubmit={toHomePage} />}
      </div>
    );
  }
}

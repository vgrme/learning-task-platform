import React, {Component, PropTypes, bindActionCreators} from 'react';
import {connect} from 'react-redux';
import {authActions} from 'redux/modules';
import {LoginForm, LoginSuccess} from 'components';
import Colors from 'material-ui/lib/styles/colors';
import cookie from 'react-cookie';

@connect(
  state => ({
    user: state.auth.user,
    token: state.auth.token,
    loginError: state.auth.loginError
  }),
  {...authActions })
export default class Login extends Component {
  static propTypes = {
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const {user, token, loginError, login} = this.props;

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
      this.context.router.push('/');
    };

    const handleClickDemo = () => {
      login('demo@demo.com', 'demo');
    };

    return (
      <div style={style}>
        {!cookieToken?<LoginForm onSubmit={login} showError={loginError} onClickDemo={handleClickDemo}/> :
                      <LoginSuccess user={user} onSubmit={toHomePage} />}
      </div>
    );
  }
}

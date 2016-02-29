import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {authActions} from 'redux/modules';
import cookie from 'react-cookie';

@connect(
  state => ({
    user: state.auth.user,
    token: state.auth.token
  }),
  { ...authActions })
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadAuth();
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.token && nextProps.token){ // login
      cookie.save('token', nextProps.token);
      this.props.loadAuth();
      this.props.history.pushState(null, '/');
    }
    if(this.props.user && !nextProps.user){ //logout
      cookie.save('token', '');
      this.props.history.pushState(null, '/login');
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
      );
  }
}

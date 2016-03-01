import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {authActions, sectionsActions} from 'redux/modules';
import cookie from 'react-cookie';

@connect(
  state => ({
    user: state.auth.user,
    token: state.auth.token
  }),
  { ...authActions, ...sectionsActions })
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadAuth();
    var params = this.props.params;
    if(params.sectionId) this.props.selectSection(params.sectionId);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.token && nextProps.token){ // login
      cookie.save('token', nextProps.token);
      this.props.loadAuth();
      this.context.router.push('/');
    }
    if(this.props.user && !nextProps.user){ //logout
      cookie.save('token', '');
      this.context.router.push('/login');
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
      );
  }
}

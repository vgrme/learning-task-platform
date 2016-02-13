import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

@connect(
  state => ({}),
  { pushState })
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };


  render() {

    return (
      <div>{this.props.children}</div>
      );
  }
}

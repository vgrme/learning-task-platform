import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sectionsActions} from 'redux/modules';
import {OutlineButton} from 'components';


@connect(
  state => ({}),
  {...sectionsActions})
export default class AddSectionButton extends Component {
  static propTypes = {
    addSection: PropTypes.func
  };

  render() {

    return (
      <OutlineButton label="+ Section" onClick={this.props.addSection}/>
    );
  }
}

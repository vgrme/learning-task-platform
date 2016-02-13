import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sectionsActions} from 'redux/modules';
import {OutlineButton} from 'components';


@connect(
  state => ({}),
  {...sectionsActions})
export default class AddSectionButton extends Component {
  static propTypes = {
    addSection: PropTypes.func.isRequired
  };

  render() {
    const {addSection} = this.props;

    return (
      <OutlineButton label="+ Section" onClick={addSection}/>
    );
  }
}

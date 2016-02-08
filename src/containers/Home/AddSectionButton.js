import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sectionsActions} from 'redux/modules';
import {OutlineButton} from 'components';


@connect(
  state => ({
    filter: state.filter
  }),
  {...sectionsActions})
export default class AddSectionButton extends Component {
  static propTypes = {
  };

  render() {

    const handleAddSection = () => {
      console.log('click');
    };

    return (
      <OutlineButton label="+ Section" onClick={handleAddSection}/>
    );
  }
}

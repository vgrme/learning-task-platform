import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import {sectionsActions} from 'redux/modules';

import {SectionRow} from 'components';

@connect(
  state => ({}),
  {  ...sectionsActions })
export default class SectionTitleRow extends Component {
  static propTypes = {
    section: PropTypes.object
  };

  render() {
    const {section} = this.props;

    const handleTextBlur = () => {
      if(!section.name){
        this.props.rollbackSectionName(section._id);
      }
      else if(section.pre && section.name !== section.pre.name){
        this.props.saveSection(section);
      }
    };

    const handleSectionClick = (sectionId) => {
      this.props.selectSection(sectionId, false);
    };

    const sectionTextStyle = {
      width: '80%',
      float: 'left'
    };

    const sectionOptionsStyle = {
      width: '20%',
      float: 'left'
    }

    return (
      <div className="clearfix">
        <SectionRow style={sectionTextStyle} section={section} onTextChange={this.props.updateSectionName} 
                    onTextBlur={handleTextBlur}/>
        <div style={sectionOptionsStyle}>
        </div>
      </div>
    );
  }

}
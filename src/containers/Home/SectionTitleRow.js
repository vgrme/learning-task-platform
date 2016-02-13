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
    section: PropTypes.object.isRequired,
    rollbackSectionName: PropTypes.func.isRequired,
    saveSection: PropTypes.func.isRequired,
    selectSection: PropTypes.func.isRequired,
    updateSectionName: PropTypes.func.isRequired
  };

  render() {
    const {section} = this.props;
    const {rollbackSectionName, saveSection, selectSection, updateSectionName} = this.props;  //from sectionsAction

    const handleTextBlur = () => {
      if(!section.name){
        rollbackSectionName(section._id);
      }
      else if(section.pre && section.name !== section.pre.name){
        saveSection(section);
      }
    };

    const handleSectionClick = (sectionId) => {
      selectSection(sectionId, false);
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
        <SectionRow style={sectionTextStyle} section={section} onTextChange={updateSectionName} 
                    onTextBlur={handleTextBlur}/>
        <div style={sectionOptionsStyle}>
        </div>
      </div>
    );
  }

}
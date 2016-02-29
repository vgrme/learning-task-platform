import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SaveNotice} from 'components';

@connect(
  state => ({
    sectionSaving: state.sections.saving,
    sectionSaved: state.sections.saved,
    sectionError: state.sections.error,
    planSaving: state.plans.saving,
    planSaved: state.plans.saved,
    planError: state.plans.error
  }),
  { })
export default class SectionPlanSaveNotice extends Component {
  static propTypes = {
  };

  render() {

    const getSaveMode = ()=>{
      const {sectionSaving, sectionSaved, sectionError} = this.props;
      const {planSaving, planSaved, planError} = this.props;
      if(sectionSaving || planSaving){
        return 'saving';
      }
      else if (sectionSaved || planSaved){
        return 'saved';
      }
      else if (sectionError || planError){
        return 'error';
      }
      return '';
    };

    return (
      <SaveNotice mode={getSaveMode()}/>
    );
  }

}
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansActions from 'redux/modules/plans';
import * as sectionsActions from 'redux/modules/sections';


@connect(
  state => ({
    //loaded: state.plans.loaded,
    //sections: state.plans,
    //filter: state.filter
  }),
  { ...plansActions, ...sectionsActions })
export default class Home extends Component {
  static propTypes = {
    loadPlans: PropTypes.func.isRequired,
    loadSections: PropTypes.func.isRequired
    //sections: PropTypes.array
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.loadPlans();
    this.props.loadSections();
  }

  render() {

    const planListStyle = {
      width: '350px',
      float: 'left',
      margin: '20px'
    };

    return (
      <div className="clearfix">
        Section
      </div>
    );
  }
}

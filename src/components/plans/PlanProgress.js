import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as plansService from 'services/planService';
import LinearProgress from 'material-ui/lib/linear-progress';
import Colors from 'material-ui/lib/styles/colors';

export default class PlanProgress extends Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired
  };

  render() {
    const {tasks} = this.props;

    const completed = tasks.filter(t=>t.complete);

    const percentage = completed.length / tasks.length * 100;

    return (
      <LinearProgress mode="determinate" value={percentage} color={Colors.teal400}/>
    );
  }
}
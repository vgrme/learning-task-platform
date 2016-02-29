import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';
import {Container, SectionCol, PlanDetailsCol} from 'containers';
import TwoColumns from '../Common/TwoColumns';

@connect(
  state => ({
    showCurrentPlan: state.plans.showCurrent
  })
)
export default class Home extends Component {
  
  render() {
    const {showCurrentPlan} = this.props;


    return (
      <Container>
        {TwoColumns(SectionCol, PlanDetailsCol, showCurrentPlan)}
      </Container>
    );
  }
}

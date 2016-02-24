import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Paper from 'material-ui/lib/paper';
import MainCol from './MainCol';
import PlanDetails from './PlanDetails';

import Container from '../App/Container';

@connect(
  state => ({
    showCurrentPlan: state.plans.showCurrent
  })
)
export default class Home extends Component {
  
  render() {
    const {showCurrentPlan} = this.props;

    const containerStyle = {
      position: 'absolute',
      top:  '50px',
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex'
    };

    const columnStyle = {
      position: 'absolute',
      top:  '0',
      bottom: 0,
      display: 'flex',
      overflow: 'auto',
      flex: 1
    };

    const planListStyle = {
      ...columnStyle,
      width: showCurrentPlan? '50%': '80%'
    };

    const planDetailStyle = {
      ...columnStyle,
      width: showCurrentPlan? '50%': '0',
      right: 0
    };

    const paperStyle = {
      width: showCurrentPlan? '100%':'80%',
      padding: '20px',
      margin: showCurrentPlan? '20px':'20px auto',
      overflowY: 'scroll',
      height: 'auto'
    };

    const filterOptions = ['All', 'Complete', 'Not Complete'];

    return (
      <Container>
        <div style={containerStyle}>
          <div style={planListStyle}> 
            <Paper style={paperStyle} zDepth={2}>
              <MainCol />
            </Paper>
          </div>
          {!showCurrentPlan?'':
            <div style={planDetailStyle}> 
              <Paper style={paperStyle} zDepth={2}>
                <PlanDetails/>
              </Paper>
            </div>
          }
        </div>
      </Container>
    );
  }
}

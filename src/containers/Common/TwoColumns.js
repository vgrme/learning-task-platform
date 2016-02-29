import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';
import {Container, SectionCol, PlanDetailsCol} from 'containers';

export default (MainCol, SecondeCol, showSecond) => {

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
    width: showSecond? '50%': '80%'
  };

  const planDetailStyle = {
    ...columnStyle,
    width: showSecond? '50%': '0',
    right: 0
  };

  const paperStyle = {
    width: showSecond? '100%':'80%',
    padding: '20px',
    margin: showSecond? '20px':'20px auto',
    overflowY: 'scroll',
    height: 'auto'
  };

  const filterOptions = ['All', 'Complete', 'Not Complete'];

  return (
    <div style={containerStyle}>
      <div style={planListStyle}> 
        <Paper style={paperStyle} zDepth={2}>
          <MainCol />
        </Paper>
      </div>
      {!showSecond?'':
        <div style={planDetailStyle}> 
          <Paper style={paperStyle} zDepth={2}>
            <SecondeCol />
          </Paper>
        </div>
      }
    </div>
  );
};

import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/lib/paper';

const PlanDetail = (props) => {

  const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };


  return (
    <div>
      <Paper style={style} zDepth={2}/>
    </div>
  );

};

PlanDetail.propTypes = {

};

export default PlanDetail;
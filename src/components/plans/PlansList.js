import React, {Component, PropTypes} from 'react';
import PlanRow from './PlanRow';

const PlansList = (props) => {

  return (
    <div>
      {
        props.plans.map((plan) => 
          <PlanRow key={plan.id} plan={plan} onTextChange={props.onTextChange} />
        )
      }
    </div>
  );

};

PlansList.propTypes = {
  plans: PropTypes.array,
  onTextChange: PropTypes.func
};

export default PlansList;
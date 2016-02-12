import React, {Component, PropTypes} from 'react';
import PlanRow from './PlanRow';

const PlansList = (props) => {

  return (
    <div>
      {
        props.plans.map((plan) => 
          <PlanRow key={plan._id} plan={plan} onTextChange={props.onTextChange}  onPlanClick={props.onPlanClick}/>
        )
      }
    </div>
  );

};

PlansList.propTypes = {
  plans: PropTypes.array,
  onTextChange: PropTypes.func,
  onPlanClick: PropTypes.func
};

export default PlansList;
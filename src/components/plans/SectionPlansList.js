import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';

import SectionRow from './SectionRow';
import PlansList from './PlansList';

const SectionPlansList = (props) => {

  const sectionStyle = {

  };

  return (
    <div>
      {props.sections.map((row)=> 
          <div key={row.section.id}>
            <SectionRow section={row.section} onTextChange={props.onSectionTextChange}/>
            <PlansList plans={row.plans} onTextChange={props.onPlanTextChange} />
          </div>
        )
      }
    </div>
  );

};

SectionPlansList.propTypes = {
  sections: PropTypes.array,
  onPlanTextChange: PropTypes.func,
  onSectionTextChange: PropTypes.func
};

export default SectionPlansList;
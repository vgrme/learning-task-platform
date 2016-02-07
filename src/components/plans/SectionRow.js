import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';

const SectionRow = (props) => {

  const sectionStyle = {

  };

  const handleTextChange = (event) => {
    if(props.onTextChange){
      console.log('c');
      props.onTextChange(props.section.id, event.target.value);
    }
  };

  return (
    <div>
      <TextField value={props.section.name} style={sectionStyle} underlineShow={false} onChange={handleTextChange} />
      <Divider />
    </div>
  );

};

SectionRow.propTypes = {
  section: PropTypes.object.isRequired,
  onTextChange: PropTypes.func
};

export default SectionRow;
import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const SectionRow = (props) => {

  const {section} = props;

  const style = {
    borderBottom: '1px solid'
  };

  const handleTextChange = (event) => {
    if(props.onTextChange){
      props.onTextChange(props.section._id, event.target.value);
    }
  };

  const sectionTextStyle = {
    width: '50%',
    float: 'left'
  };

  const sectionOptionsStyle = {
    width: '50%',
    float: 'left'
  };

  const btnStyle ={
    float: 'right',
    border: '1px solid',
    borderColor: 'green',
    lineHeight: '20px',
    margin: '20px 0 0 10px',
    minWidth: '30px',
    fontWeight: '0',
    fontSize: '10px'
  }


  return (

    <div style={style} className="clearfix">
      <div style={sectionTextStyle}>
        <TextField value={props.section.name} underlineShow={false} 
                   onChange={handleTextChange} onBlur={()=>props.onTextBlur(section)}/>
      </div>
      {!section.isActive?'':
        <div style={sectionOptionsStyle}>
          {props.hideArchive?'':<FlatButton style={btnStyle} label="Archive" onClick={()=>props.onArchiveClick(section)}/>}
          {!props.section.name?'':<FlatButton style={btnStyle} label="+ Plan" onClick={()=>props.onAddPlanClick(section._id)}/>}  
        </div>
      }
    </div>
  );

};

SectionRow.propTypes = {
  section: PropTypes.object.isRequired,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onSectionClick: PropTypes.func
};

export default SectionRow;
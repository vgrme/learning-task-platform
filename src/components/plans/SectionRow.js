import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

const SectionRow = (props) => {

  const {section, hideArchive, onTextChange, onTextBlur, onArchiveClick, onAddPlanClick} = props;

  const style = {
    borderBottom: '1px solid'
  };

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(section._id, event.target.value);
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
  };


  return (

    <div style={style} className="clearfix">
      <div style={sectionTextStyle}>
        <TextField value={section.name} underlineShow={false} 
                   onChange={handleTextChange} onBlur={onTextBlur}/>
      </div>
      {!section.isActive?'':
        <div style={sectionOptionsStyle}>
          {hideArchive?'':<FlatButton style={btnStyle} label="Archive" onClick={()=>onArchiveClick(section)}/>}
          {!section.name?'':<FlatButton style={btnStyle} label="+ Plan" onClick={()=>onAddPlanClick(section._id)}/>}  
        </div>
      }
    </div>
  );

};

SectionRow.propTypes = {
  section: PropTypes.object.isRequired,
  hideArchive: PropTypes.bool,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onArchiveClick: PropTypes.func,
  onAddPlanClick: PropTypes.func
};

export default SectionRow;
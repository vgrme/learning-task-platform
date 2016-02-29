import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Colors from 'material-ui/lib/styles/colors';

const SectionRow = (props) => {

  const {section, onTextChange, onTextBlur, onArchiveClick, onAddPlanClick, autoFocus, isActive} = props;

  const style = {
    borderBottom: '1px solid '+Colors.brown500
  };

  const handleTextChange = (event) => {
    if(onTextChange){
      onTextChange(section._id, event.target.value);
    }
  };

  const sectionTextStyle = {
    width: '50%',
    float: 'left',
    height: 40,
    fontWeight: 500
  };

  const sectionOptionsStyle = {
    width: '50%',
    float: 'left'
  };

  const btnStyle ={
    float: 'right',
    border: '1px solid',
    borderColor: Colors.brown500,
    lineHeight: '20px',
    margin: '15px 0 0 10px',
    minWidth: '30px',
    fontWeight: '0',
    fontSize: '10px'
  };

  return (

    <div style={style} className="clearfix">
      <div style={sectionTextStyle}>
        <TextField value={section.name} underlineShow={false} autoFocus={autoFocus}
                   onChange={handleTextChange} onBlur={onTextBlur} onEnterKeyDown={onTextBlur}/>
      </div>
      {!isActive?'':
        <div style={sectionOptionsStyle}>
          {!section._id?'':<FlatButton style={btnStyle} label={section.active?"Archive":"UnArchive"} onClick={onArchiveClick}/>}
          {!section.name?'':<FlatButton style={btnStyle} label="+ Plan" onClick={onAddPlanClick}/>}  
        </div>
      }
    </div>
  );

};

SectionRow.propTypes = {
  section: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onTextChange: PropTypes.func,
  onTextBlur: PropTypes.func,
  onArchiveClick: PropTypes.func,
  onAddPlanClick: PropTypes.func
};

export default SectionRow;
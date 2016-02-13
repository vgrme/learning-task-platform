import React, {Component, PropTypes} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import { Link } from 'react-router';

const LeftSideBar = (props) => {

  const {open, sections, width, onClickClose} = props;

  const closeIconStyle = {
    cursor: 'pointer',
    float: 'right',
    padding: '5px'
  };

  return (
    <LeftNav open={open} width={width}>
      <div className="clearfix">
        <FontIcon className="material-icons" onClick={onClickClose} style={closeIconStyle}>clear</FontIcon>
      </div>
      {
        sections.map(s => <Link to={`/section/${s._id}`} key={s._id}><MenuItem>{s.name}</MenuItem></Link> )
      }
    </LeftNav>
  );

};

LeftSideBar.propTypes = {
  sections: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  //width: PropTypes.Number,
  onClickClose: PropTypes.func.isRequired
};

export default LeftSideBar;

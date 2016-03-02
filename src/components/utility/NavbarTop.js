import React, {PropTypes} from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import colors from 'helpers/colors';


const NavbarTop = (props) => {
  const height = '40px';

  const iconStyle = {
    lineHeight: height,
    padding: '0 10px 0 10px'
  };

  const menuIconStyle = {
    ...iconStyle,
    borderRight: '1px solid '+ Colors.grey300,
    display: props.showMenuBtn? 'block': 'none'
  };

  const logoutIconStyle = {
    ...iconStyle,
    float:'right'
  };

  const navBarStyle = {
    height: height,
    backgroundColor: 'white',
    borderBottom: '1px solid '+ Colors.grey300
  };

  const titleStyle = {
    lineHeight: height,
    marginLeft: '20px'
  };

  return (
    <Toolbar style={navBarStyle}>
      <ToolbarGroup firstChild={true} float="left">
        <FontIcon className="material-icons" style={menuIconStyle} onClick={props.onClickMenu}>menu</FontIcon>
        <FontIcon className="material-icons" style={iconStyle} onClick={props.onClickHome}>home</FontIcon>
        <ToolbarTitle text={props.title} style={titleStyle}/>
      </ToolbarGroup>
      <ToolbarGroup float="right">
        <FontIcon className="fa fa-sign-out" style={logoutIconStyle} onClick={props.onClickLogout} />
      </ToolbarGroup>
    </Toolbar>
  );
  
};

NavbarTop.propTypes = {
  title: PropTypes.string.isRequired,
  onClickMenu: PropTypes.func,
  showMenuBtn: PropTypes.bool
};

export default NavbarTop;
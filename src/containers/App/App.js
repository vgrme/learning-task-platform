import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import {NavbarTop} from 'components';
import LeftSideBar from './LeftSideBar';

import * as leftNavActions from 'redux/modules/leftSideBar';


@connect(
  state => ({
    isLeftSideBarOpen: state.leftSideBar
  }),
  { ...leftNavActions, pushState })
export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    openLeftNav: PropTypes.func,
    closeLeftNav: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const title = 'LiF - Learning is Fun';
    const sideBarWidth = 280;

    const handleClickMenuBtn = () =>{
      this.props.openLeftNav();
    };

    const handleClickClose = () =>{
      this.props.closeLeftNav();
    };

    const leftSideBarStyle = {
      width: sideBarWidth
    };

    const containerStyle = {
      marginLeft: this.props.isLeftSideBarOpen? sideBarWidth + 'px':'0'
    };

    return (
      <div>
        <LeftSideBar width={sideBarWidth} onClickClose={handleClickClose}/>
        <div style={containerStyle}>
          <NavbarTop title={title} onClickMenu={handleClickMenuBtn} showMenuBtn={!this.props.isLeftSideBarOpen}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}

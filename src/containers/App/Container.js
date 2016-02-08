import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {NavbarTop} from 'components';
import LeftSideBar from './LeftSideBar';
import {plansActions, sectionsActions} from 'redux/modules';
import * as leftNavActions from 'redux/modules/leftSideBar';


@connect(
  state => ({
    isLeftSideBarOpen: state.leftSideBar
  }),
  { ...leftNavActions, ...plansActions, ...sectionsActions })
export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    openLeftNav: PropTypes.func,
    closeLeftNav: PropTypes.func
  };

  componentDidMount() {
    this.props.loadPlans();
    this.props.loadSections();
  }

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
      position: 'absolute',
      left: this.props.isLeftSideBarOpen? sideBarWidth + 'px':'0',
      right: 0,
      bottom: 0,
      top:0
    };

    return (
      <div>
        <LeftSideBar width={sideBarWidth} onClickClose={handleClickClose}/>
        <div style={containerStyle}>
          <NavbarTop title={title} onClickMenu={handleClickMenuBtn} showMenuBtn={!this.props.isLeftSideBarOpen}/>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

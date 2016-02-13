import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {NavbarTop, LeftSideBar} from 'components';
import {plansActions, sectionsActions} from 'redux/modules';
import * as leftNavActions from 'redux/modules/leftSideBar';


@connect(
  state => ({
    isLeftSideBarOpen: state.leftSideBar,
    sections: state.sections.list
  }),
  { ...leftNavActions, ...plansActions, ...sectionsActions })
export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isLeftSideBarOpen: PropTypes.bool.isRequired,
    sections: PropTypes.array,
    openLeftNav: PropTypes.func.isRequired,
    closeLeftNav: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadPlans();
    this.props.loadSections();
  }

  render() {
    const title = 'LiF - Learning is Fun';
    const sideBarWidth = 280;
    const {isLeftSideBarOpen, sections} = this.props;
    const {openLeftNav, closeLeftNav} = this.props;

    const handleClickMenuBtn = () =>{
      openLeftNav();
    };

    const handleClickClose = () =>{
      closeLeftNav();
    };

    const leftSideBarStyle = {
      width: sideBarWidth
    };

    const containerStyle = {
      position: 'absolute',
      left: isLeftSideBarOpen? sideBarWidth + 'px':'0',
      right: 0,
      bottom: 0,
      top:0
    };

    return (
      <div>
        <LeftSideBar width={sideBarWidth} onClickClose={handleClickClose} open={isLeftSideBarOpen}
                     sections={sections}/>
        <div style={containerStyle}>
          <NavbarTop title={title} onClickMenu={handleClickMenuBtn} showMenuBtn={!isLeftSideBarOpen}/>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import {NavbarTop} from 'components';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import {sectionsActions, plansActions} from 'redux/modules';
import * as leftNavActions from 'redux/modules/leftSideBar';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


@connect(
  state => ({
    isLeftSideBarOpen: state.leftSideBar
  }),
  { ...leftNavActions, ...sectionsActions, ...plansActions })
@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isLeftSideBarOpen: PropTypes.bool.isRequired,
    openLeftNav: PropTypes.func.isRequired,
    closeLeftNav: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadPlans();
    this.props.loadSections();
    this.props.loadPlansPercentageInfo();
  }

  render() {
    const title = 'LIF - Learning is Fun';
    const sideBarWidth = 280;
    const {isLeftSideBarOpen} = this.props;
    const {openLeftNav, closeLeftNav} = this.props;

    const handleClickMenuBtn = () =>{
      openLeftNav();
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
        <LeftSideBar width={sideBarWidth} open={isLeftSideBarOpen} />
        <div style={containerStyle}>
          <NavbarTop title={title} onClickMenu={handleClickMenuBtn} showMenuBtn={!isLeftSideBarOpen}/>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
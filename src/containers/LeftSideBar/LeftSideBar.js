import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import colors from 'helpers/colors';

import {CloseIcon} from 'components';
import SectionList from './SectionList';
import * as leftNavActions from 'redux/modules/leftSideBar';


@connect(
  state => ({ }),
  { ...leftNavActions })
export default class LeftSideBar extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  render() {
    const {open, width} = this.props;
    const {closeLeftNav} = this.props;   //from action

    const style = {
      backgroundColor: colors.lightPurple
    };

    const handleClickClose = () =>{
      closeLeftNav();
    };

    return (
      <LeftNav open={open} width={width} style={style}>
        <CloseIcon onClick={handleClickClose}/>
        <SectionList />
      </LeftNav>
    );

  }

}
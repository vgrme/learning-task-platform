import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import colors from 'helpers/colors';

import {SectionMenuItem, CloseIcon} from 'components';
import {sectionsActions} from 'redux/modules';
import * as leftNavActions from 'redux/modules/leftSideBar';


@connect(
  state => ({
    sections: state.sections.list
  }),
  { ...leftNavActions, ...sectionsActions })
export default class LeftSideBar extends React.Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired
    //width: PropTypes.Number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {open, width, sections} = this.props;
    const {closeLeftNav, selectSection} = this.props;   //from action

    const style = {
      backgroundColor: colors.lightPurple
    };

    const handleClickClose = () =>{
      closeLeftNav();
    };

    const handleSelectSection = (section) => {
      selectSection(section._id);
    };

    return (
      <LeftNav open={open} width={width} style={style}>
        <CloseIcon onClick={handleClickClose}/>
        {
          sections.map(s => 
            <SectionMenuItem key={s._id} section={s} onClick={()=>handleSelectSection(s)}/>
            )
        }
      </LeftNav>
    );

  }

}
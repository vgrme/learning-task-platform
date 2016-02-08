import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {sectionsActions} from 'redux/modules';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

import { Link } from 'react-router';

@connect(
  state => ({
    sections: state.sections,
    open: state.leftSideBar
  }),
  { ...sectionsActions })
export default class LeftSideBar extends Component {
  static propTypes ={
    sections: PropTypes.array
  };

  render() {
    const closeIconStyle = {
      cursor: 'pointer',
      float: 'right',
      padding: '5px'
    };

    return (
      <LeftNav open={this.props.open} width={this.props.width}>
        <div className="clearfix">
          <FontIcon className="material-icons" onClick={this.props.onClickClose} style={closeIconStyle}>clear</FontIcon>
        </div>
        {
          this.props.sections.map(s => <Link to={`/section/${s.id}`} key={s.id}><MenuItem>{s.name}</MenuItem></Link> )
        }
      </LeftNav>
    );
  }
}

//TODO: separate sections list

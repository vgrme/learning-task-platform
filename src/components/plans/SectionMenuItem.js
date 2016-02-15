import React, {Component, PropTypes} from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import colors from 'helpers/colors';

export default class SectionMenuItem extends React.Component {
  static propTypes = {
    section: PropTypes.object.isRequired,
    isCurrent: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  render() {
    const {section, isCurrent, onClick} = this.props;

    const itemHoverStyle = {
      fontSize: 18,
      fontWeight: 500,
      backgroundColor: colors.darkPurple
    };

    const itemSeletedStyle = {
      fontSize: 18,
      fontWeight: 500,
      backgroundColor: colors.lightGrey,
      color: colors.darkPurple
    };

    const itemStyle = {
      color: colors.lightYellow,
      ...(this.state.hover?itemHoverStyle:{}),
      ...(section.isCurrent?itemSeletedStyle:{})
    };

    const handleMouseEnter = () => {
      this.setState({
        hover: true
      });
    };

    const handleMouseLeave = () => {
      this.setState({
        hover: false
      });
    };

    return (
      <MenuItem style={itemStyle} isCurrent={isCurrent} onClick={onClick}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{section.name}</MenuItem>
    );

  }

}
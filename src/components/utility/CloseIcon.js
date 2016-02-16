import React, {Component, PropTypes} from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import colors from 'helpers/colors';

export default class CloseIcon extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const {onClick} = this.props;

    const closeIconHoverStyle = {
      color: 'white'
    };

    const closeIconStyle = {
      cursor: 'pointer',
      float: 'right',
      padding: '5px',
      ...(this.state.hover?closeIconHoverStyle:{})
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
      <div className="clearfix">
        <FontIcon className="material-icons" onClick={onClick} style={closeIconStyle}
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>clear</FontIcon>
      </div>
    );

  }

}
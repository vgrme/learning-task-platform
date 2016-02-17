import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';

export default class CircleButton extends Component {
  static propTypes = {
  };

  render() {
    const {style, tooltip, iconClassName, onClick, onTouchTap} = this.props;  //from actions

    const btnStyle = {
      ...style,
      width: 38,
      height: 38,
      marginTop: 10,
      padding: 0
    };

    const tooltipStyles = {
      top: 14
    };

    const iconStyle = {
      border: '1px solid',
      borderColor: Colors.brown500,
      padding: 2,
      color: Colors.brown500,
      width: 25,
      height: 25,
      borderRadius: '50%'
    };

    const iconClass = iconClassName || "material-icons";

    return (
      <IconButton style={btnStyle} iconStyle={iconStyle} iconClassName= {iconClass}
                  tooltip={tooltip} tooltipStyles={tooltipStyles} onTouchTap={onTouchTap}>
        {this.props.children}
      </IconButton>
    );
  }
}

import React, {Component, PropTypes} from 'react';

export default class CloseIcon extends React.Component {
  static propTypes = { };

  render() {
    const style = {
      position: 'absolute',
      backgroundColor: 'white',
      opacity: 0.7,
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    return (
      <div style={style}>
      </div>
    );

  }

}
import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const style = {
  // width: 400
};

@DragDropContext(HTML5Backend)
export default class DragSortWrapper extends Component {
  constructor(props) {
    super(props);
    // this.moveCard = this.moveCard.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    // const { cards } = this.state;
    // const dragCard = cards[dragIndex];

    // this.setState(update(this.state, {
    //   cards: {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragCard]
    //     ]
    //   }
    // }));
  }

  render() {
    //const { cards } = this.state;

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
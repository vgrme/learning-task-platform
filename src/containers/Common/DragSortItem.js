import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import FontIcon from 'material-ui/lib/font-icon';
import { DragSource, DropTarget } from 'react-dnd';
import Colors from 'material-ui/lib/styles/colors';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  },
  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    var item = monitor.getItem();

    var dropResult = monitor.getDropResult();

    props.saveItems();
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const getType = (props) => {
  return props.type;
};

@DropTarget(getType, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(getType, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class DragSortItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    moveItem: PropTypes.func.isRequired,
    saveItems: PropTypes.func.isRequired,
    dragHandle: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      showDragIcon: false
    };
  }

  render() {
    const { text, isDragging, dragHandle, connectDragSource, connectDropTarget, connectDragPreview } = this.props;

    const style = {
      position: 'relative',
      cursor: dragHandle? '': 'move',
      opacity: isDragging ? 0 : 1
    };

    const DragIconSize = 20;

    const dragHandleStyle = {
      position: 'absolute',
      margin: 'auto',
      top: 0,
      bottom: 0,
      width: DragIconSize, 
      height: DragIconSize,
      left: -1*DragIconSize,
      cursor: 'move',
      zIndex: 10
    };

    const dragIconStyle = {
      color: Colors.grey500,
      fontSize: DragIconSize
    };

    const onMouseEnter = () => {
      this.setState({
        showDragIcon: true
      });
    };

    const onMouseLeave = () => {
      this.setState({
        showDragIcon: false
      });
    };

    const dragHandel = (!this.state.showDragIcon&&!isDragging?'':
                         <FontIcon className="material-icons" style={dragIconStyle}>reorder</FontIcon>);

    const item = dragHandle? (<div>{connectDragSource(<div style={dragHandleStyle}>{dragHandel}</div>)}
                              <div>{this.props.children}</div></div>):
                             connectDragSource(<div>{this.props.children}</div>);

    return connectDropTarget(connectDragPreview(
      <div style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {item}
      </div>
    ));
  }
}
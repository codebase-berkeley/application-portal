import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import QuestionContainer from '../containers/QuestionContainer';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired, // the index (order) of the card on the form
  moveCard: PropTypes.func.isRequired, // (dragIndex: int, hoverIndex: int) => any
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired, // the question object to display
};

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index; // index of the item being dragged
    const hoverIndex = props.index; // index of the item being hovered over

    // don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Get the rectangle bounding the hovered-over item
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    // get vertical center
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2.0;
    // get mouse position
    const clientOffset = monitor.getClientOffset();
    // get pixels to the top of the rectangle
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // check if crossed middle for <dragging upwards> and <dragging downwards>
    if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
      return;
    }

    // do swap!
    props.moveCard(dragIndex, hoverIndex);

    // God forgive me for this mutation.
    monitor.getItem().index = hoverIndex;
  }
}

const cardSourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

const cardTargetCollect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

const ItemTypes = {
  CARD: "CARD",
};

/*
DraggableQuestion container

Wrapper for QuestionContainer that handles making it a draggable item.
*/
class DraggableQuestion extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      index,
      moveCard,
      dispatch,
      question,
    } = this.props;
    return connectDropTarget(connectDragSource(
      <div className="qedit-wrapper">
        <QuestionContainer
          index={index}
          moveCard={moveCard}
          dispatch={dispatch}
          question={question} />
      </div>
    ));
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, cardTargetCollect)(
  DragSource(ItemTypes.CARD, cardSource, cardSourceCollect)(DraggableQuestion)
);

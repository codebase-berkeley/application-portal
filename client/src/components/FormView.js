import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DraggableQuestion from '../containers/DraggableQuestion';
import Answer from '../components/Answer';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  form: PropTypes.object.isRequired, // the form object to be displayed.
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired,
};

/*
FormView Component

View and edit page for an application form.
*/
class FormView extends Component {
  constructor(props) {
    super(props);

    const { form } = this.props;

    this.state = {
      questionIds: form.questions,
    };
    this.moveCard = this.moveCard.bind(this);
  }

  // swaps the cards at dragIndex and hoverIndex.
  // dragIndex - index of the card currently being dragged.
  // hoverIndex - index of the card being hovered over.
  moveCard(dragIndex, hoverIndex) {
    const { questionIds } = this.state;
    const dragQuestionId = questionIds[dragIndex]; // id of question being dragged
    const newQuestionIds = [...questionIds];
    newQuestionIds.splice(dragIndex, 1);
    newQuestionIds.splice(hoverIndex, 0, dragQuestionId);
    this.setState({
      questionIds: newQuestionIds,
    });
  }

  /*
  Renders a question object as one of Paragraph, Dropdown, Radiobutton, Checkbox.
  */
  renderQuestion(question, i) {
    const { dispatch } = this.props;
    return (
      <DraggableQuestion
        moveCard={this.moveCard}
        index={i}
        key={question.id}
        dispatch={dispatch}
        question={question} />
    );
  }

  /*
  Renders the questions in correct order.
  */
  renderQuestionList() {
    const { questions } = this.props;
    const { questionIds } = this.state;
    const questionElements = questionIds.map((questionId, i) => this.renderQuestion(questions[questionId], i));
    return questionElements;
  }

  render() {
    const { form } = this.props;
    return (
      <div className="form">
        <div className="form-meta">
          <h1 className="form-meta-name">
            {`${form.name} Questions`}
          </h1>
        </div>
        <div className="form-body">
          {this.renderQuestionList()}
        </div>
      </div>
    );
  }
}

FormView.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities } = state;
  const { questions } = entities;
  return {
    questions,
  };
}

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps)(FormView)
);

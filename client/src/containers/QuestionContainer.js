import React, { Component, PropTypes } from 'react';
import QuestionEdit from '../components/QuestionEdit';

import { saveUpdatedQuestion } from '../actions/FormActions';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired, // the index (order) of the card on the form
  moveCard: PropTypes.func.isRequired, // (dragIndex: int, hoverIndex: int) => any
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired, // the question object to display
};


/*
QuestionContainer Container

Wrapper for an editable question card on an application form. Handles UI state of
editable question fields and dispatches requests to add/edit/delete the question
on the server.
*/
class QuestionContainer extends Component {
  constructor(props) {
    super(props);

    const q = this.props.question;
    this.state = {
      isActive: false, // whether or not the question is currently being edited
      questionText: q.question_text,
      questionType: q.question_type,
      optionsList: (q.options.length !== 0) ? JSON.parse(q.options) : [],
    };

    this.onAddOption = this.onAddOption.bind(this);
    this.onEditOption = this.onEditOption.bind(this);
    this.onDeleteOption = this.onDeleteOption.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEditQuestionText = this.onEditQuestionText.bind(this);
    this.onEditQuestionType = this.onEditQuestionType.bind(this);
    this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
    this.onSaveQuestion = this.onSaveQuestion.bind(this);
  }

  onAddOption() {
    const { optionsList } = this.state;
    this.setState({
      optionsList: [...optionsList, "New Option"],
    });
  }

  onEditOption(optionText, index) {
    const { optionsList } = this.state;
    let newOptionsList = [...optionsList];
    newOptionsList[index] = optionText;
    this.setState({
      optionsList: newOptionsList,
    });
  }

  onDeleteOption(index) {
    const { optionsList } = this.state;
    let newOptionsList = [...optionsList];
    newOptionsList.splice(index, 1);
    this.setState({
      optionsList: newOptionsList,
    });
  }

  onEditQuestionText(questionText) {
    this.setState({
      questionText: questionText,
    });
  }

  onEditQuestionType(questionType) {
    this.setState({
      questionType: questionType,
    });
  }

  onDeleteQuestion() {
    // TODO
  }

  onSaveQuestion() {
    const { dispatch, question } = this.props;
    const { questionText, questionType, optionsList } = this.state;
    dispatch(saveUpdatedQuestion({
      ...question,
      question_text: questionText,
      question_type: questionType,
      options: JSON.stringify(optionsList),
    }));
  }

  /*
  Called whenever a contained element is blurred.
  */
  onBlur(e) {
    /*
      the zero timeout queues this function to execute at the end of the next
      main thread tick. we don't execute the setState immediately because
      we want to be able to clear this queued function if we detect a
      bubbled-up focus event that would cancel out this blur event.
    */
    this._timeoutID = setTimeout(() => {
      if (this.state.isActive) {
        this.setState({
          isActive: false,
        }, this.onSaveQuestion);
      }
    }, 0);
  }

  /*
  Called whenever a contained element is focused.
  */
  onFocus() {
    clearTimeout(this._timeoutID);
    if (!this.state.isActive) {
      this.setState({
        isActive: true,
      });
    }
  }


  render() {
    const { connectDragSource, connectDragPreview } = this.props;
    return (
      <QuestionEdit
        {...this.state}
        connectDragSource={connectDragSource}
        connectDragPreview={connectDragPreview}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onAddOption={this.onAddOption}
        onEditOption={this.onEditOption}
        onDeleteOption={this.onDeleteOption}
        onEditQuestionText={this.onEditQuestionText}
        onEditQuestionType={this.onEditQuestionType}
        onDeleteQuestion={this.onDeleteQuestion}
        onSaveQuestion={this.onSaveQuestion}
      />
    );
  }
}

QuestionContainer.propTypes = propTypes;

export default QuestionContainer;

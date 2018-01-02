import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
  }

  /*
  Renders a question object as one of Paragraph, Dropdown, Radiobutton, Checkbox.
  */
  renderQuestion(question) {
    const dummyAnswer = {
      id: 0,
      application: 0,
      question: question.id,
      answer_text: question.question_type == 'Paragraph' ? '' : '[]'
    };
    return (
      <Answer
        key={question.id}
        question={question}
        answer={dummyAnswer}
        className="form-question" />
    );
  }

  /*
  Renders the questions in correct order.
  */
  renderQuestionList() {
    const { form, questions } = this.props;
    const questionIds = form.questions;
    const questionElements = questionIds.map((questionId) => this.renderQuestion(questions[questionId]));
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

export default connect(mapStateToProps)(FormView);

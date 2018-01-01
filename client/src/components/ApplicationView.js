import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Answer from '../components/Answer';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  application: PropTypes.object.isRequired, // the application object to be displayed.
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired, // the form for the application.
  questions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

/*
ApplicationView Component

A single application view.
*/
class ApplicationView extends Component {
  constructor(props) {
    super(props);
  }

  /*
  Renders an answer in the context of its question.
  */
  renderAnswer(answer) {
    const { questions } = this.props;
    return (
      <div>
        <Answer answer={answer} question={questions[answer.question]} />
      </div>
    );
  }

  /*
  Renders the answers in correct order corresponding to the question order on the form.
  */
  renderAnswerList() {
    const { application, form, questions } = this.props;
    const answerIds = Object.keys(application.answers);
    const answerList = answerIds.map((answerId) => application.answers[answerId]);
    answerList.sort((a, b) => {
      if (questions[a.question].order_number < questions[b.question].order_number) {
        return -1;
      } else if (questions[a.question].order_number > questions[b.question].order_number) {
        return 1;
      } else {
        return 0;
      }
    });
    const answerElements = answerList.map((answer) => this.renderAnswer(answer));
    return answerElements;
  }

  render() {
    const { application } = this.props;

    return (
      <div>
        {this.renderAnswerList()}
      </div>
    );
  }
}

ApplicationView.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities } = state;
  const { applications, questions, users } = entities;
  return {
    applications,
    questions,
    users,
  };
}


export default connect(mapStateToProps)(ApplicationView);

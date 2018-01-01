import React, { Component, PropTypes } from 'react';

const propTypes = {
  answer: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

/*
ParagraphAnswer Component
Renders an answer within the full context of a Paragraph question.
*/
class ParagraphAnswer extends Component {
  render() {
    const { answer, question } = this.props;
    return (
      <textarea disabled={true} value={answer.answer_text} />
    );
  }
}

ParagraphAnswer.propTypes = propTypes;

export default ParagraphAnswer;

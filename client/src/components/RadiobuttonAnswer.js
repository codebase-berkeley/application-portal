import React, { Component, PropTypes } from 'react';

const propTypes = {
  answer: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

/*
RadiobuttonAnswer Component
Renders an answer within the full context of a Radiobutton question.
*/
class RadiobuttonAnswer extends Component {
  render() {
    const { answer, question } = this.props;
    const options = JSON.parse(question.options);
    const selectedOptions = new Set(JSON.parse(answer.answer_text));
    const radioInputs = options.map((option, i) => {
      return (
        <div key={`q${question.id}C${i}`}>
          <input
            defaultChecked={selectedOptions.has(option)}
            disabled="disabled"
            type="radio"
            id={`q${question.id}C${i}`}
            name={`q${question.id}`}
            value={option} />
          <label for={`q${question.id}C${i}`}>{option}</label>
        </div>
      );
    });
    return (
      <div>
        {radioInputs}
      </div>
    );
  }
}

RadiobuttonAnswer.propTypes = propTypes;

export default RadiobuttonAnswer;

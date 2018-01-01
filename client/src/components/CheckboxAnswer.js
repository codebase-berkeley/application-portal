import React, { Component, PropTypes } from 'react';

const propTypes = {
  answer: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

/*
CheckboxAnswer Component
Renders an answer within the full context of a Checkbox question.
*/
class CheckboxAnswer extends Component {
  render() {
    const { answer, question } = this.props;
    const options = JSON.parse(question.options);
    const selectedOptions = new Set(JSON.parse(answer.answer_text));
    const checkboxInputs = options.map((option, i) => {
      return (
        <div key={`q${question.id}C${i}`}>
          <input
            defaultChecked={selectedOptions.has(option)}
            disabled="disabled"
            type="checkbox"
            id={`q${question.id}C${i}`}
            name={`q${question.id}`}
            value={option} />
          <label htmlFor={`q${question.id}C${i}`}>{option}</label>
        </div>
      );
    });
    return (
      <div>
        {checkboxInputs}
      </div>
    );
  }
}

CheckboxAnswer.propTypes = propTypes;

export default CheckboxAnswer;

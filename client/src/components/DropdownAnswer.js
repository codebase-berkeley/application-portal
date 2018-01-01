import React, { Component, PropTypes } from 'react';

const propTypes = {
  answer: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

/*
DropdownAnswer Component
Renders an answer within the full context of a Dropdown question.
*/
class DropdownAnswer extends Component {
  render() {
    const { answer, question } = this.props;
    const options = JSON.parse(question.options);
    const selectedOptions = new Set(JSON.parse(answer.answer_text));
    const dropdownOptions = options.map((option, i) => {
      return (
        <option
          key={`q${question.id}C${i}`}
          value={option}
        >
          {option}
        </option>
      );
    });
    return (
      <select value={selectedOptions.values()[0]}>
        {dropdownOptions}
      </select>
    );
  }
}

DropdownAnswer.propTypes = propTypes;

export default DropdownAnswer;

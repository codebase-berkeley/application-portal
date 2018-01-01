import React, { Component, PropTypes } from 'react';

import CheckboxAnswer from '../components/CheckboxAnswer';
import DropdownAnswer from '../components/DropdownAnswer';
import ParagraphAnswer from '../components/ParagraphAnswer';
import RadiobuttonAnswer from '../components/RadiobuttonAnswer';

const propTypes = {
  answer: PropTypes.object.isRequired, // the answer to display.
  question: PropTypes.object.isRequired, // the question associated with the answer.
};

class Answer extends Component {
  render() {
    const { question } = this.props;
    switch (question.question_type) {
      case 'Checkbox':
        return <CheckboxAnswer {...this.props} />;
      case 'Dropdown':
        return <DropdownAnswer {...this.props} />;
      case 'Paragraph':
        return <ParagraphAnswer {...this.props} />;
      case 'Radiobutton':
        return <RadiobuttonAnswer {...this.props} />;
      default:
        return (<div>Invalid question type</div>);
    }
  }
}

Answer.propTypes = propTypes;

export default Answer;

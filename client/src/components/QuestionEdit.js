import React, { Component, PropTypes } from 'react';
import FocusField from '../components/FocusField';

import { getEmptyImage } from 'react-dnd-html5-backend';

const propTypes = {
  connectDragSource: PropTypes.func.isRequired, // function to indicate drag handle
  connectDragPreview: PropTypes.func.isRequired, // function to pass in drag preview
  isActive: PropTypes.bool.isRequired,
  questionText: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
  optionsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onBlur: PropTypes.func.isRequired, // type: () => any
  onFocus: PropTypes.func.isRequired, // type: () => any
  onAddOption: PropTypes.func.isRequired, // type: () => any
  onEditOption: PropTypes.func.isRequired, // type: (opText: str, index: int) => any
  onDeleteOption: PropTypes.func.isRequired, // type: (index: int) => any
  onEditQuestionText: PropTypes.func.isRequired, // type: (qText: str) => any
  onEditQuestionType: PropTypes.func.isRequired, // type: (qType: str) => any
  onDeleteQuestion: PropTypes.func.isRequired, // type: () => any
  onSaveQuestion: PropTypes.func.isRequired, // type: () => any
}

class QuestionEdit extends Component {
  componentDidMount() {
    // use empty image as drag preview
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback
      captureDraggingState: true,
    });
  }
  renderQuestionContent() {
    const { questionType } = this.props;
    if (questionType === 'Paragraph') {
      return (<textarea disabled={true} value={'Paragraph text'} />);
    }
    return this.renderOptionsList();
  }

  /*
  Renders delete button, change type dropdown etc. at the bottom of the question.
  */
  renderQuestionMeta() {
    const {
      questionType,
      onEditQuestionType,
      onDeleteQuestion,
    } = this.props;
    const TYPES = ['Paragraph', 'Dropdown', 'Radiobutton', 'Checkbox'];
    const typeOptions = TYPES.map((type, i) => {
      return (
        <option value={type} key={i}>
          {type}
        </option>
      );
    })
    return (
      <div className="qedit-meta">
        <select
          className="qedit-meta-type"
          value={questionType}
          onChange={(e) => { onEditQuestionType(e.target.value); }}
        >
          {typeOptions}
        </select>
        <div
          onClick={ (e) => { onDeleteQuestion(); } }
          className="qedit-meta-delete btn"
          title="delete">
          <i className="ion-trash-b" />
        </div>
      </div>
    );
  }

  renderOptionsList() {
    const {
      isActive,
      optionsList,
      questionType,
      onAddOption,
      onEditOption,
      onDeleteOption,
    } = this.props;
    let optionDecoration = null;
    switch (questionType) {
      case 'Checkbox':
        optionDecoration = (<input type="checkbox" disabled={true} />);
        break;
      case 'Radiobutton':
        optionDecoration = (<input type="radio" disabled={true} />);
        break;
      default:
        break;
    }
    const optionElements = optionsList.map((optionText, i) => {
      return (
        <li key={i}>
          {optionDecoration}
          <FocusField
            className="qedit-option"
            onChange={(e) => { onEditOption(e.target.value, i); }}
            value={optionText} />
          <div
            onClick={ (e) => { onDeleteOption(i); } }
            className="qedit-option-del"
            title="Delete option">
            <i className="ion-close" />
          </div>
        </li>
      );
    });
    if (isActive) {
      optionElements.push((
        <li key={optionElements.length}>
          <a
            className="qedit-option-add"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onAddOption();
            }}>
            Add an option
          </a>
        </li>
      ));
    }
    return (
      <ul className="qedit-oplist">
        {optionElements}
      </ul>
    );
  }

  render() {
    const {
      connectDragSource,
      isActive,
      questionText,
      onBlur,
      onFocus,
      onEditQuestionText,
    } = this.props;
    return (
      <div
        className={`qedit ${isActive ? "active" : ""}`}
        tabIndex="1"
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {connectDragSource(
          <div className="qedit-drag">
            <i className="ion-drag" />
          </div>
        )}
        <FocusField
          className="qedit-qtext"
          onChange={(e) => { onEditQuestionText(e.target.value); }}
          value={questionText} />
        {this.renderQuestionContent()}
        {isActive ? this.renderQuestionMeta() : null}
      </div>
    );
  }
}

QuestionEdit.propTypes = propTypes;

export default QuestionEdit;

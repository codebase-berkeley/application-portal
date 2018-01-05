import React, { Component, PropTypes } from 'react';


const propTypes = {
  className: PropTypes.string, // any extra CSS classes to append to the element.
  onChange: PropTypes.func.isRequired, // callback to handle text field change.
  value: PropTypes.string, // current value of the field.
};

/*
FocusField Component

A text field that doesn't look like a text field until you click on it to edit it.
*/
class FocusField extends Component {
  render() {
    const { className, onChange, value } = this.props;
    return (
      <input
        type="text"
        className={`focusfield ${className}`}
        onChange={onChange}
        value={value}
        />
    );
  }
}

FocusField.propTypes = propTypes;

export default FocusField;

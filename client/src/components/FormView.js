import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

  render() {
    return (
      <div>
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

import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
  form: PropTypes.object.isRequired, // the form object to be displayed.
  dispatch: PropTypes.func.isRequired,
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

export default FormView;

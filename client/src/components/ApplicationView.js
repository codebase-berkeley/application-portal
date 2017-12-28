import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  application: PropTypes.object.isRequired, // the application object to be displayed.
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired, // set of user entities by ID
};

/*
ApplicationView Component

A single application view.
*/
class ApplicationView extends Component {
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

ApplicationView.propTypes = propTypes;

export default ApplicationView;

import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  applications: PropTypes.object.isRequired, // set of application entities by ID
  applicationIds: PropTypes.arrayOf(PropTypes.number).isRequired, // array of application IDs to be displayed in order
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired, // set of user entities by ID
};

/*
ApplicationList Component

The list of applications for some category. Displays a given list of applications.
Pagination is handled elsewhere!
*/
class ApplicationList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { applications, applicationIds } = this.props;
    const applicationList = applicationIds.map((applicationId) => {
      const application = applications[applicationId];
      return (
        <li key={applicationId}>
          {`${application.first_name} ${application.last_name}`}
        </li>
      );
    });
    return (
      <ul>
        {applicationList}
      </ul>
    );
  }
}

ApplicationList.propTypes = propTypes;

export default ApplicationList;

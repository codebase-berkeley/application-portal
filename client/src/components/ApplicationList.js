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
NOTE: This is a dumb component. Pagination is handled elsewhere!
*/
class ApplicationList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { applications, applicationIds, dispatch } = this.props;
    const applicationList = applicationIds.map((applicationId) => {
      const application = applications[applicationId];
      const itemClass = `applist-item ${application.read ? "" : "unread"}`;
      return (
        <Link
          key={applicationId}
          dispatch={dispatch}
          route={{
            path: ["application"],
            query: {
              applicationId: applicationId.toString(),
              formId: application.form.toString(),
              categoryId: application.category.toString(),
            },
          }}
          >
          <li className={itemClass}>
            <input type="checkbox" className="applist-item-checkbox" />
            <span>{`${application.first_name} ${application.last_name}`}</span>
          </li>
        </Link>
      );
    });
    return (
      <div className="applist">
        <ul>
          {applicationList}
        </ul>
      </div>
    );
  }
}

ApplicationList.propTypes = propTypes;

export default ApplicationList;

import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
  applications: PropTypes.object.isRequired, // set of application entities by ID
  applicationList: PropTypes.arrayOf(PropTypes.number).isRequired, // array of application IDs to be displayed in order
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
    return (
      <div>
      </div>
    );
  }
}

ApplicationList.propTypes = propTypes;

export default ApplicationList;

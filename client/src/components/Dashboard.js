import React, { Component, PropTypes } from "react";

import Link from "../components/Link";
import Popover from "../components/Popover";
import DashToolbar from "../components/DashToolbar";
import DashSidebar from "../components/DashSidebar";


const propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DashToolbar {...this.props} />
        <DashSidebar {...this.props} />
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;

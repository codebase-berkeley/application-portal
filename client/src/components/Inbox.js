import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
    dispatch: PropTypes.func.isRequired,
};

class Inbox extends Component {
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

Inbox.propTypes = propTypes;

export default Inbox;

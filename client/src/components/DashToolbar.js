import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
  forms: PropTypes.object.isRequired, // set of form entities
  dashboard: PropTypes.object.isRequired, // object describing current dashboard state
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

class DashToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { forms, dashboard } = this.props;
    const { currentFormId } = dashboard;
    return (
      <div className="dash-bar">
        <div className="container clearfix">
          <div className="dash-bar-sec-sm dash-bar-pull-left">
            <div className="dash-bar-form-name">
              {currentFormId ? forms[currentFormId].name : null}
            </div>
          </div>
          <div className="dash-bar-sec-lg dash-bar-pull-left">
            <div className="dash-bar-control">
              <div className="btn">
                Select...
              </div>
            </div>
            <div className="dash-bar-control">
              <div className="btn">
                View Public Form
                <i className="ion-monitor" />
              </div>
            </div>
            <div className="dash-bar-control">
              <div className="btn">
                Edit Public Form
                <i className="ion-document-text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashToolbar.propTypes = propTypes;

export default DashToolbar;

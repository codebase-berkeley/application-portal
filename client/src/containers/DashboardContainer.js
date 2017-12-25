import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import Dashboard from "../components/Dashboard";

const propTypes = {};

class DashboardContainer extends Component {
    render() {
        return <Dashboard {...this.props} />;
    }
}

DashboardContainer.propTypes = propTypes;

function mapStateToProps(state) {
    const { env, nav } = state;
    const { isMobile } = env;

    return {
        isMobile,
        nav,
    };
}

export default connect(mapStateToProps)(DashboardContainer);

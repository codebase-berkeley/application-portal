import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";

const propTypes = {
  
};

class NavContainer extends Component {
    render() {
        return <Nav {...this.props} />;
    }
}

NavContainer.propTypes = propTypes;

function mapStateToProps(state) {
    const { authed, env, nav } = state;
    const { isMobile } = env;

    return {
        authed,
        isMobile,
        nav,
    };
}

export default connect(mapStateToProps)(NavContainer);

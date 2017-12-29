import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initAuth } from '../actions/AuthedActions';
import { initEnv } from '../actions/EnvActions';
import { initNav } from '../actions/NavActions';

import DashboardContainer from '../containers/DashboardContainer';
import NavContainer from '../containers/NavContainer';


const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.array.isRequired,
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initAuth()); // authorize the user if he/she exists.
    dispatch(initEnv()); // initialize the app environment according to the device.
    dispatch(initNav()); // set browser back buttons and history to work with the app.
  }

  render() {
    const { height, isMobile, width } = this.props;
    return (
      <div>
        <NavContainer />
        <DashboardContainer />
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { env, nav } = state;
  const { height, isMobile, width } = env;
  const { path } = nav.route;

  return {
    height,
    isMobile,
    path,
    width,
  };
}

export default connect(mapStateToProps)(App);

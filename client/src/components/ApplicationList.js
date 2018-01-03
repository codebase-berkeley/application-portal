import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  applications: PropTypes.object.isRequired, // set of application entities by ID
  applicationIds: PropTypes.arrayOf(PropTypes.number).isRequired, // array of application IDs to be displayed in order
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired, // set of user entities by ID
  handleSelectionChange : PropTypes.func, // Defaulted to () => {} 
  resetSelections : PropTypes.func, // Defaulted to () => {}
};

/*
ApplicationList Component

The list of applications for some category. Displays a given list of applications.
NOTE: This is a dumb component. Pagination is handled elsewhere!
*/
class ApplicationList extends Component {
  constructor(props) {
    super(props);

    // Initialize states
    const state = { selected : {} }
    const applications = props.applications;
    for (var applicationId in applications) {
      state.selected[applicationId] = false
    }
    this.state = state

    // Provide defaults for prop functions
    this.passSelectionChange   = this.props.passSelectionChange === undefined ? () => {} : this.props.passSelectionChange;
    this.resetSelections       = this.props.resetSelections     === undefined ? () => {} : this.props.resetSelections;    
  }

  componentWillMount() {
    this.resetApplicationListSelections();
  }

  componentWillUnmount() {
    this.resetApplicationListSelections();
  }

  componentWillReceiveProps(nextProps) {
    // Reset ApplicationList iff applicationIds differs
    if (_.difference(this.props.applicationIds, nextProps.applicationIds).length !== 0) {
      this.resetApplicationListSelections();
    }
  }

  /**
   * Resets the states of ApplicationList and DashboardContainer
   */
  resetApplicationListSelections() {
    // Push the reset up
    this.resetSelections();

    // Handle reset on the ApplicationList
    var newSelected = this.state.selected;
    var shouldUpdateState = false;
    for (var applicationId in newSelected) {
      if (newSelected[applicationId] == true) {
        shouldUpdateState = true
        break;
      }
    }

    if (shouldUpdateState) {
      newSelected = {}
      for (var applicationId in this.state.selected) {
        newSelected[applicationId] = false
      }
      this.setState({selected : newSelected});
    }
  }

  handleSelectionChange(applicationId) {
    const applicationList = this;
    return function (e) {
      applicationList.setState((prevState, props) => {
        var nextState = {selected : Object.assign({}, prevState.selected)}
        nextState.selected[applicationId] = !prevState.selected[applicationId];
        applicationList.passSelectionChange(applicationId, nextState.selected[applicationId])(e);        
        return nextState;
      });    
    }
  }

  render() {
    const { applications, applicationIds, dispatch } = this.props;
    const applicationList = applicationIds.map((applicationId) => {
      const application = applications[applicationId];
      const itemClass = `applist-item ${application.read ? "" : "unread"}`;
      return (
        <li className={itemClass} key={applicationId}>
          <input type="checkbox" className="applist-item-checkbox" onChange={this.handleSelectionChange(applicationId)}/>
          <Link
            className="applist-item-link"
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
          <span>{`${application.first_name} ${application.last_name}`}</span>
          </Link>
        </li>
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

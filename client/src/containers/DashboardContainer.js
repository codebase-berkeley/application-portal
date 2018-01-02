import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Link from '../components/Link';
import Popover from '../components/Popover';
import DashToolbar from '../components/DashToolbar';
import DashSidebar from '../components/DashSidebar';
import ApplicationView from '../components/ApplicationView';
import CategoryContainer from '../containers/CategoryContainer';
import FormView from '../components/FormView';

import { fetchForms } from '../actions/FormActions';
import { navigateHome } from '../actions/NavActions';

const propTypes = {
  applications: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
};

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { dispatch } = this.props;
    // fetch the forms to be displayed on the dashboard.
    dispatch(fetchForms());

    // Initialize state variables
    this.state.applicationIsSelected = false; // True iff any applications are selected
    this.state.selectedApplications = []; // List of selected applications
  }

  /**
   * Handles all changes to selections on the applications
   * @param {String} applicationId Id of the modified application
   * @param {Object} applicationList the ApplicationList wrapper
   */
  handleSelectionChange(applicationId, applicationList) {
    const dashboardContainer = this;
    return function(e) {
      // Update the state of the application list
      applicationList.setState((prevState) => {
        const newState = JSON.parse(JSON.stringify(prevState)) // Testing
        newState.selected[applicationId] = !prevState.selected[applicationId];
        return newState;
      }, () => {
        // Update the state of the Dashboard container
        dashboardContainer.setState((prevState, props) => {
          const newState = JSON.parse(JSON.stringify(prevState))
          if (applicationList.state.selected[applicationId] == true) {
            newState.applicationIsSelected = true
            if (!(newState.selectedApplications.indexOf(applicationId) >= 0)) {
              newState.selectedApplications.push(applicationId)
            }
          } else {
            if (newState.selectedApplications.indexOf(applicationId) >= 0) {
              newState.selectedApplications.splice(newState.selectedApplications.indexOf(applicationId), 1)
            }

            if (newState.selectedApplications.length > 0) {
              newState.applicationIsSelected = true 
            } else {
              newState.applicationIsSelected = false
            }
          }

          console.log("State for DashboardContainer = " , newState)

          return newState;
        });      
      });
    }
  }

  /**
   * Resets the state
   */
  resetSelections() {
    this.setState({
      applicationIsSelected : false,
      selectedApplications : []
    })
  }


  /*
  ROUTER.
  Render the desired content based on the current route.
  */
  renderContent() {
    const { applications, categories, nav, dispatch, forms } = this.props;
    const { path, query } = nav.route;
    switch (path[0]) {
      case 'dashboard':
        if (query) {
          // display category page.
          const categoryId = Number(query.categoryId);
          const page = ('page' in query) ? Number(query.page) : 1;
          return <CategoryContainer categoryId={categoryId} page={page} handleSelectionChange={this.handleSelectionChange.bind(this)}/>;
        } else if (Object.keys(forms).length !== 0) {
          // user went to the base dashboard URL.
          // by default, the base dashboard URL redirects to the first form and category.
          dispatch(navigateHome());
          return;
        } else {
          // we don't have forms to redirect to, so display a placeholder.
          return <div>Loading...</div>;
        }

      case 'application': {
        const applicationId = Number(query.applicationId);
        const application = applications[applicationId];
        const form = forms[query.formId];
        return <ApplicationView application={application} form={form} />;
      }

      case 'form': {
        const form = forms[query.formId];
        return <FormView dispatch={dispatch} form={forms[query.formId]} />;
      }
      default:
        // Will need to create a 404 component.
        return (<div><h2> 404 - Page not found </h2></div>);
    }
  }

  render() {
    const { categories, dispatch, forms, nav } = this.props;
    const { query } = nav.route;
    const currentForm = query && ('formId' in query) ? forms[query.formId] : null;

    return (
      <div>
        <DashToolbar {...this.props} />
        <div className="dash-body">
          <div className="container clearfix">
            <DashSidebar
              categories={categories}
              form={currentForm}
              dispatch={dispatch}
              nav={nav}
            />
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities, nav } = state;
  const { applications, categories, forms } = entities;

  return {
    applications,
    categories,
    forms,
    nav,
  };
}

export default connect(mapStateToProps)(DashboardContainer);

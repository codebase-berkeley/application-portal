import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Link from '../components/Link';
import Popover from '../components/Popover';
import DashToolbar from '../components/DashToolbar';
import DashSidebar from '../components/DashSidebar';
import ApplicationView from '../components/ApplicationView';
import ApplicationList from '../components/ApplicationList';
import FormView from '../components/FormView';

import { fetchForms } from '../actions/FormActions';

const propTypes = {
  applications: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  forms: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
};

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
      // fetch the forms to be displayed on the dashboard.
    dispatch(fetchForms());
  }

  renderContent() {
    const { applications, categories, dashboard, nav, dispatch } = this.props;
    const { path } = nav.route;
    switch (path[0]) {
      case 'dashboard':
        const { currentCategoryId } = dashboard;
        const currentCategory = currentCategoryId ? categories[currentCategoryId] : null;
        const applicationIds = currentCategory ? currentCategory.applications : [];
        return (
          <ApplicationList
            applications={applications}
            applicationIds={applicationIds}
            dispatch={dispatch}
          />
        );
      case 'application':
        return <ApplicationView dispatch={dispatch} />;
      case 'form':
        return <FormView dispatch={dispatch} />;
      default:
        return (<div></div>);
    }
  }

  render() {
    const { categories, dashboard, dispatch, forms, nav } = this.props;
    const { currentFormId } = dashboard;
    const currentForm = currentFormId ? forms[currentFormId] : null;

    return (
      <div>
        <DashToolbar {...this.props} />
        <div className="dash-body">
          <div className="container clearfix">
            <DashSidebar
              categories={categories}
              dashboard={dashboard}
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
  const { dashboard, entities, nav } = state;
  const { applications, categories, forms } = entities;

  return {
    applications,
    categories,
    dashboard,
    forms,
    nav,
  };
}

export default connect(mapStateToProps)(DashboardContainer);

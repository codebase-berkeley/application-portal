import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';

import ApplicationList from "../components/ApplicationList";
import { fetchCategoryPage } from "../actions/CategoryActions";

const propTypes = {
  applications: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  categoryId: PropTypes.number.isRequired, // which category to display.
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired, // the page number to display.
  pagination: PropTypes.object.isRequired,
};

/*
CategoryContainer Container

Wrapper for ApplicationList. Handles pagination of applications for a container
and fetching of paginated application data.
*/
class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    // Provide defaults for prop functions
    this.passSelectionChange = this.props.passSelectionChange === undefined ? () => {} : this.props.passSelectionChange;
    this.resetSelections     = this.props.resetSelections     === undefined ? () => {} : this.props.resetSelections;    
  }

  componentWillMount() {
    const { categoryId, dispatch, page } = this.props;
    // fetch page content if needed.
    dispatch(fetchCategoryPage(categoryId, page));
  }

  componentWillUpdate(nextProps, nextState) {
    const { categoryId, dispatch, page } = nextProps;
    // fetch new page content if needed.
    if (categoryId !== this.props.categoryId || page !== this.props.page) {
      dispatch(fetchCategoryPage(categoryId, page));
    }
  }

  render() {
    const { categoryId, page, pagination } = this.props;
    const pageURN = `/category?id=${categoryId}&p=${page}`;

    if (pageURN in pagination) {
      const { applications, dispatch } = this.props;
      return <ApplicationList
        applications={applications}
        applicationIds={pagination[pageURN].ids}
        dispatch={dispatch} 
        passSelectionChange={this.passSelectionChange}
        resetSelections={this.resetSelections}/>;
    }
    // page not yet fetched. display placeholder.
    return  (
      <div>Loading...</div>
    );
  }
}

CategoryContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities, pagination } = state;
  const { applications, categories } = entities;
  return {
    applications,
    categories,
    pagination,
  };
}

export default connect(mapStateToProps)(CategoryContainer);

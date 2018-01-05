import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  form: PropTypes.object, // the form object associated with the sidebar's categories. if null, display a placeholder.
  categories: PropTypes.object.isRequired, // set of category entities.
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

/*
Displays the sidebar that lists the categories for the given form.
*/
class DashSidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderCategories() {
    const { form, categories, dispatch, nav } = this.props;
    const { query } = nav.route;
    const currentCategoryId = query && ("categoryId" in query) ? query.categoryId : null;
    const currentFormId = query && ("formId" in query) ? query.formId : null;

    if (form) {
      return form.categories.map((categoryId) => {
        const category = categories[categoryId];
        return (
          <Link
            key={category.name}
            dispatch={dispatch}
            route={{ path: ["dashboard"], query: { categoryId: categoryId.toString(), formId: currentFormId }}}
          >
            <div
              className={`dash-side-cat ${category.id == currentCategoryId ? 'active' : ''}`}>
              {category.name}
            </div>
          </Link>
        );
      });
    }
    // TODO: Placeholder while forms are loading.
    return null;
  }

  render() {
    return (
      <div className="dash-side">
        {this.renderCategories()}
      </div>
    );
  }
}

DashSidebar.propTypes = propTypes;

export default DashSidebar;

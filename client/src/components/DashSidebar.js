import React, { Component, PropTypes } from "react";
import Link from "../components/Link";
import Popover from "../components/Popover";

const propTypes = {
  form: PropTypes.object, // the form object associated with the sidebar's categories. if null, display a placeholder.
  categories: PropTypes.object.isRequired, //set of category entities.
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
    const { form, categories } = this.props;
    if (form) {
      return form.categoryIds.map((categoryId) => {
        const category = categories[categoryId];
        return (
          <div key={category.name}>
            {category.name}
          </div>
        );
      });
    }
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

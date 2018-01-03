import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const propTypes = {
  forms: PropTypes.object.isRequired, // set of form entities
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

class DashToolbar extends Component {
  constructor(props) {
    super(props);
  }

  renderFormList() {
    const { forms, dispatch, nav } = this.props;
    const formIds = Object.keys(forms);

    // sort by descending date order, newest first
    formIds.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return -1;
      } else if (a.created_at < b.created_at) {
        return 1;
      }
      return 0;
    });
    return formIds.map((formId) => {
      const defaultCategoryId = forms[formId].categories[0];
      return (
        <li key={formId}>
          <Link
            className="dash-bar-form-select-dropdown-item"
            dispatch={dispatch}
            route={{ path: ["dashboard"], query: { formId: formId, categoryId: defaultCategoryId }}}
          >
            {forms[formId].name}
          </Link>
        </li>
      );

    });
  }

  getDeleteButton() {
    if (this.props.applicationIsSelected === true) {
      return (
        <div className="dash-bar-control">
            <div className="btn">
              Delete Applications
              <i className="ion-trash-a" />
            </div>
        </div>
      );
    } else {
      return (<div> </div>);
    }
  }

  getMoveButton() {
    if (this.props.applicationIsSelected === true) {
      return (
        <div className="dash-bar-control">
          <div className="btn">
            Move Applications
            <i className="ion-shuffle" />
          </div>
        </div>
      );
    } else {
      return (<div> </div>);
    }      
  }

  render() {
    const { dispatch, forms, nav } = this.props;
    const { query } = nav.route;
    const currentFormId = query && ("formId" in query) ? query.formId : null;
    const deleteButton = this.getDeleteButton();
    const moveButton   = this.getMoveButton();
    return (
      <div className="dash-bar">
        <div className="container clearfix">
          <div className="dash-bar-sec-sm dash-bar-pull-left">
            <Popover className="dash-bar-form-select">
              <div className="dash-bar-form-name">
                <span>{currentFormId ? forms[currentFormId].name : null}</span>
                <i className="icon ion-chevron-down" />
                <i className="icon ion-chevron-up" />
              </div>
              <ul className="dash-bar-form-select-dropdown popover-content">
                {this.renderFormList()}
              </ul>
            </Popover>
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
              <Link
                className="btn"
                dispatch={dispatch}
                route={{ path: ['form'], query: { formId: currentFormId }}}
              >
                Edit Public Form
                <i className="ion-document-text" />
              </Link>
            </div>
            {moveButton}
            {deleteButton}
          </div>
        </div>
      </div>
    );
  }
}

DashToolbar.propTypes = propTypes;

export default DashToolbar;

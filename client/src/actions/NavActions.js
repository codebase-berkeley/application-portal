import * as types from '../constants/ActionTypes';
import { constructUrl, parseUrl } from '../utils/RouteUtils';
import { initialRoute } from '../reducers/nav';

/*
Navigates to a default route, specifically /dashboard?formId=<>categoryId=<>,
where formId and categoryId are set to be defaults.
*/
export function navigateHome() {
  return (dispatch, getState) => {
    const { entities } = getState();
    const { forms } = entities;
    const formIds = Object.keys(forms);
    if (formIds.length === 0) {
      dispatch(navigateTo({ path: ["dashboard"] }));
    }
    // get the latest form.
    const defaultFormId = formIds.reduce((latestFormId, formId) => {
      if (forms[formId].created_at > forms[latestFormId].created_at) {
        return formId;
      }
      return latestFormId;
    }, formIds[0]);
    const defaultCategoryId = forms[defaultFormId].categories[0];
    dispatch(navigateTo({ path: ["dashboard"], query: { formId: defaultFormId, categoryId: defaultCategoryId }}));
  };
}

/*
 * Set browser back buttons and route navigation to work with our app.
 */
export function initNav() {
  return dispatch => {
    window.onpopstate = e => {
      dispatch(navigateBack(e));
    };

    if (window.location.hash !== '') {
      dispatch(navigateTo(parseUrl(window.location.hash)));
    } else if (window.location.pathname === '/') {
      pushState(initialRoute);
    }
  };
}

export function navigateBack(e) {
  return dispatch => {
    if (e.state) {
      return dispatch(navigateTo(e.state.route, false));
    }

    return null;
  };
}

/*
 * Navigate to the specified route.
 */
export function navigateTo(route, shouldPushState = true) {
  return (dispatch, getState) => {
    const { nav } = getState();
        // if already at the route we want to navigate to, do nothing.
    if (constructUrl(route) === constructUrl(nav.route)) {
      return null;
    }

        // should add to browser history (so back button works)?
    if (shouldPushState) {
      pushState(route);
    }

    return dispatch(changePath(route));
  };
}

/*
 * Add the specified route to the browser history so back button works properly.
 */
function pushState(route) {
  history.pushState({ route }, '', `#/${constructUrl(route)}`);
}

export function changePath(route) {
  return {
    type: types.CHANGE_PATH,
    route,
  };
}

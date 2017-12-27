import merge from "lodash";
import * as types from '../constants/ActionTypes';

const initialState = {
  applications: {},
  categories: {},
  forms: {},
  questions: {},
  users: {},
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    let newState = merge.merge({}, state, action.entities);
    switch (action.type) {
      case types.RECEIVE_CATEGORIES:
        // note mutation here is only of a temporary variable.
        newState.forms[action.formId].categoryIds = action.categoryIds;
        return newState;
      default:
        return newState;
    }
  }

  return state;
}

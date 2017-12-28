import * as types from "../constants/ActionTypes";

const initalState = {
    currentFormId: null, // the id of the current form being displayed.
    currentCategoryId: null, // the id of the current category being displayed.
};

export default function dashboard(state = initalState, action) {
  switch (action.type) {
    case types.CHANGE_CURRENT_FORM_ID:
      return { ...state, currentFormId: action.formId };

    case types.CHANGE_CURRENT_CATEGORY_ID:
      return { ...state, currentCategoryId: action.categoryId };

    default:
      return state;
  }
}

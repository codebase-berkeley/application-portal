import * as types from "../constants/ActionTypes";

export function changeCurrentFormId(formId) {
  return {
    type: types.CHANGE_CURRENT_FORM_ID,
    formId
  };
}

export function changeCurrentCategoryId(categoryId) {
  return {
    type: types.CHANGE_CURRENT_CATEGORY_ID,
    categoryId,
  };
}

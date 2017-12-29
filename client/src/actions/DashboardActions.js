import * as types from '../constants/ActionTypes';

/*
Changes the ID of the current form being viewed in the dashboard. 
*/
export function changeCurrentFormId(formId) {
  return {
    type: types.CHANGE_CURRENT_FORM_ID,
    formId,
  };
}

/*
Changes the ID of the current category being viewed in the dashboard.
*/
export function changeCurrentCategoryId(categoryId) {
  return {
    type: types.CHANGE_CURRENT_CATEGORY_ID,
    categoryId,
  };
}

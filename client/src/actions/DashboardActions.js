import * as types from "../constants/ActionTypes";

export function changeCurrentFormId(formId) {
  return {
    type: types.CHANGE_CURRENT_FORM_ID,
    formId
  };
}

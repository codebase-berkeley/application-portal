import { arrayOf, normalize } from "normalizr";
import { formSchema } from "../constants/schemas";

import * as types from "../constants/ActionTypes";
import { EXAMPLE_FORMS } from "../constants/ExampleData";

import { fetchCategories } from "../actions/CategoryActions";
import { changeCurrentFormId, changeCurrentCategoryId } from "../actions/DashboardActions";

/*
action fetchForms

Fetches the set of available forms from the server. Does necessary processing on response.
*/
export function fetchForms() {
  return (dispatch, getState) => {
    const { authed } = getState();

    const receivedForms = EXAMPLE_FORMS.forms;

    const normalized = normalize(receivedForms, arrayOf(formSchema));
    const formIds = normalized.result;
    dispatch(receiveForms({ formIds, entities: normalized.entities }));
    dispatch(fetchCategories(formIds[0])).then(() => {
      const { forms } = getState().entities;
      const firstCategoryId = forms[formIds[0]].categoryIds[0];
      dispatch(changeCurrentFormId(formIds[0]));
      dispatch(changeCurrentCategoryId(firstCategoryId));
    });
  }
}

/*
action receiveForms

Adds the new forms to the set of form entities.
*/
export function receiveForms({ formIds, entities }) {
  return {
    type: types.RECEIVE_FORMS,
    formIds,
    entities,
  };
}

import { arrayOf, normalize } from "normalizr";
import { categorySchema, questionSchema } from "../constants/schemas";

import * as types from "../constants/ActionTypes";
import { EXAMPLE_CATEGORIES } from "../constants/ExampleData";


/*
action fetchCategories

Fetches the categories for the given form.
Each category will also come with the first page of results for applications in that category.
*/
export function fetchCategories(formId) {
  return (dispatch, getState) => {
    const { authed } = getState();

    const receivedCategories = EXAMPLE_CATEGORIES.categories;
    const formId = EXAMPLE_CATEGORIES.form;
    /*
    Preprocess the categories in the category list and normalize the results.
    */
    const normalized = normalize(receivedCategories, arrayOf(categorySchema));
    const categoryIds = normalized.result;

    dispatch(receiveCategories({
      categoryIds,
      formId,
      entities: normalized.entities
    }));
  }
}

/*
action receiveCategories

Sets the categories of the given form to the ordered list categoryIds, and
adds any associated entities.
*/
export function receiveCategories({ categoryIds, formId, entities }) {
  return {
    type: types.RECEIVE_CATEGORIES,
    categoryIds,
    formId,
    entities,
  };
}

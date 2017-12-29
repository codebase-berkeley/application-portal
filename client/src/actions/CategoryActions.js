import { arrayOf, normalize } from 'normalizr';
import { categorySchema, applicationSchema } from '../constants/schemas';

import * as types from '../constants/ActionTypes';
import { EXAMPLE_CAT1_PAGE1, EXAMPLE_CAT2_PAGE1, EXAMPLE_CAT3_PAGE1 } from '../constants/ExampleData';

export function fetchCategoryPage(categoryId, page) {
  return (dispatch, getState) => {
    const pageData = EXAMPLE_CAT1_PAGE1;
    const normalized = normalize(pageData.applications, arrayOf(applicationSchema));
    const ids = normalized.result;

    dispatch(receiveCategoryPage({
      categoryId,
      page,
      entities: normalized.entities,
      ids,
    }))
  };
}

export function receiveCategoryPage({
  categoryId, // ID of the category associated with this page.
  page, // page number.
  entities, // set of entities associated with the page.
  ids, // ordered list of IDs of the items on the page.
}) {
  return {
    type: types.RECEIVE_PAGE,
    pagePrefix: `/category?id=${categoryId}&p=`,
    page,
    entities,
    ids,
  };
}

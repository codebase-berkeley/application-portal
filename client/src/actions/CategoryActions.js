import { arrayOf, normalize } from 'normalizr';
import { categorySchema, applicationSchema } from '../constants/schemas';
import { constructUrl } from '../utils/RouteUtils';
import { API_PREFIX } from '../constants/config';

import * as types from '../constants/ActionTypes';
import { EXAMPLE_CAT1_PAGE1, EXAMPLE_CAT1_PAGE2, EXAMPLE_CAT1_PAGE3, EXAMPLE_CAT2_PAGE1, EXAMPLE_CAT3_PAGE1 } from '../constants/ExampleData';

export function fetchCategoryPage(categoryId, page) {
  return (dispatch, getState) => {
    const pageUrl = constructUrl({
      path: ['api', 'applications'],
      query: { category_id: categoryId, page: page },
    });
    fetch(API_PREFIX + pageUrl, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        const normalized = normalize(json.applications, arrayOf(applicationSchema));
        const ids = normalized.result;

        dispatch(receiveCategoryPage({
          categoryId,
          page,
          entities: normalized.entities,
          ids,
        }));
      });

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

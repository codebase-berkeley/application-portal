import * as types from '../constants/ActionTypes';

/*
Creates a pagination reducer for a given paginated entity.

mapActionToKey takes in an action and returns a key that is unique for
a specified page of a paginated entity. For example, if we want to update
page 4 of search results for application "Andrew", the key for this
page might be something like "/search?q=Andrew&p=4".
*/
export default function createPaginationReducer(mapActionToKey) {
  return (state = {}, action) => {
    const key = mapActionToKey(action);
    // Update pagination for the given endpoint
    switch (action.type) {
      case types.CHANGE_CURRENT_PAGE:
        return {
          ...state,
          [key]: {
            ...state[key],
            currentPage: action.page,
          },
        };
      case types.REQUEST_PAGE:
        return {
          ...state,
          [key]: {
            ids: [],
            fetching: true,
          },
        };
      case types.RECEIVE_PAGE:
        return {
          ...state,
          [key]: {
            ids: action.ids,
            fetching: false,
          },
        };
      default:
        return state;
    }
  };
}

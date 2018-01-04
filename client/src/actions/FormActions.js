import { arrayOf, normalize } from 'normalizr';
import { formSchema } from '../constants/schemas';

import * as types from '../constants/ActionTypes';
import { EXAMPLE_FORMS } from '../constants/ExampleData';

import { navigateHome } from "../actions/NavActions";

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
//  dispatch(navigateHome());
  };
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

/*
action saveUpdatedQuestion

Edits an existing question's details, saving the new question details and
sending them to the server.
*/
export function saveUpdatedQuestion(question) {
  return (dispatch, getState) => {
    // optimistically update local question
    dispatch(updateQuestion(question));
    // send to server (TODO)...
    // and receive response
  }
}

export function updateQuestion(question) {
  return {
    type: types.UPDATE_QUESTION,
    entities: {
      questions: {
        [question.id]: question,
      },
    },
  };
}

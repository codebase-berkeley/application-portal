import { arrayOf, normalize } from 'normalizr';
import { formSchema } from '../constants/schemas';

import * as types from '../constants/ActionTypes';
import { EXAMPLE_FORMS } from '../constants/ExampleData';

import { navigateHome } from "../actions/NavActions";
import { constructUrl } from '../utils/RouteUtils';
import { API_PREFIX } from '../constants/config';

/*
action fetchForms

Fetches the set of available forms from the server. Does necessary processing on response.
*/
export function fetchForms() {
  return (dispatch, getState) => {
    const { authed } = getState();

    const formsUrl = constructUrl({ path: ['api', 'forms'] });
    fetch(API_PREFIX + formsUrl, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        const receivedForms = json.forms;

        const normalized = normalize(receivedForms, arrayOf(formSchema));
        const formIds = normalized.result;
        dispatch(receiveForms({ formIds, entities: normalized.entities }));
      });
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

export function updateForm(form) {
  return {
    type: types.UPDATE_FORM,
    entities: {
      forms: {
        [form.id]: form,
      },
    },
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

/*
action tryDeleteQuestion

Attempts to delete a question from the server and locally.
*/
export function tryDeleteQuestion(questionId) {
  return (dispatch, getState) => {
    // optimistically delete local question from its form
    // (don't need to delete the question from the set of questions)
    const { questions, forms } = getState().entities;
    const form = forms[questions[questionId].form_id];
    const newForm = {
      ...form,
      questions: [...form.questions],
    };
    newForm.questions.splice(form.questions.indexOf(questionId), 1);
    dispatch(updateForm(newForm));
    // send to server (TODO)...
  };
}

/*
action tryUpdateFormQuestions

Attempts to update a form's question list to a new ordered list of question IDs,
sending the new ordered list to the server as well.
*/
export function tryUpdateFormQuestions(questionIds, formId) {
  return (dispatch, getState) => {
    const { forms } = getState().entities;
    const form = forms[formId];
    const newForm = {
      ...form,
      questions: questionIds,
    };
    dispatch(updateForm(newForm));
    // send to server (TODO)...
  };
}

/*
action tryAddNewQuestion

Attempts to add a new question and associate it with the given form.
*/
export function tryAddNewQuestion(formId) {
  return (dispatch, getState) => {
    // request server for new question ID associated with formId (TODO)
    // ...
  }
}

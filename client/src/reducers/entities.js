import _ from 'lodash';
import * as types from '../constants/ActionTypes';

const initialState = {
  applications: {},
  categories: {},
  forms: {},
  questions: {},
  users: {},
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    let newState = null;
    switch (action.type) {
      case types.UPDATE_FORM:
        newState = {
          ...state,
          forms: {
            ...state.forms,
            ...action.entities.forms,
          },
        };
        return newState;
      case types.UPDATE_QUESTION:
        newState = {
          ...state,
          questions: {
            ...state.questions,
            ...action.entities.questions,
          },
        };
        return newState;
      default:
        newState = _.merge({}, state, action.entities);
        return newState;
    }
  }

  return state;
}

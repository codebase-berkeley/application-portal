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
    let newState = _.merge({}, state, action.entities);
    switch (action.type) {
      default:
        return newState;
    }
  }

  return state;
}

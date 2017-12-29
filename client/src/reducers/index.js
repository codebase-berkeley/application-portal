import { combineReducers } from 'redux';
import authed from '../reducers/authed';
import entities from '../reducers/entities';
import env from '../reducers/env';
import nav from '../reducers/nav';
import createPaginationReducer from '../reducers/pagination';

const rootReducer = combineReducers({
  authed,
  entities,
  env,
  nav,
  pagination: createPaginationReducer((action) => {
    return action.pagePrefix + action.page;
  }),
});

export default rootReducer;

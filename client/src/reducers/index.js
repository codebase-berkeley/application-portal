import { combineReducers } from "redux";
import authed from "../reducers/authed";
import dashboard from "../reducers/dashboard";
import entities from "../reducers/entities";
import env from "../reducers/env";
import nav from "../reducers/nav";
import createPaginationReducer from "../reducers/pagination";

const rootReducer = combineReducers({
    authed,
    dashboard,
    entities,
    env,
    nav,
});

export default rootReducer;

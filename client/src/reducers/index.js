import { combineReducers } from "redux";
import authed from "../reducers/authed";
import env from "../reducers/env";
import nav from "../reducers/nav";

const rootReducer = combineReducers({
    authed,
    env,
    nav,
});

export default rootReducer;

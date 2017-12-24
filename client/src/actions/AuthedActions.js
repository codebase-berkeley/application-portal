import Cookies from "js-cookie";
import * as types from "../constants/ActionTypes";

const COOKIE_PATH = "sessionid";

/*
 * Ret: Action initAuth
 * Attempts to authenticate the user if they have an access token, else do nothing.
 */
export function initAuth() {
    return dispatch => {
        const sessionId = Cookies.get(COOKIE_PATH);
        if (sessionId) {
            /*
            If a session ID already exists, go ahead and
            authenticate the user with the server.
            */
            return null;
        }
        return null;
    };
}

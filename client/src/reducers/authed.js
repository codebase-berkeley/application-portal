import * as types from "../constants/ActionTypes";

const initialState = {
    sessionId: null, // session ID of the currently authed user, from cookies.
    user: null //ID of the currently authed user.
};

export default function authed(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

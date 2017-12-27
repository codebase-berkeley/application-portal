import * as types from "../constants/ActionTypes";

const initalState = {
    currentFormId: null, // the id of the current form being displayed.
};

export default function dashboard(state = initalState, action) {
    switch (action.type) {
        case types.CHANGE_CURRENT_FORM_ID:
            return { ...state, currentFormId: action.formId };
            
        default:
            return state;
    }
}

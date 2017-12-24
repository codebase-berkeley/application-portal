import * as types from "../constants/ActionTypes";

export function changeIsMobile(isMobile) {
    return {
        type: types.CHANGE_IS_MOBILE,
        isMobile
    };
}

export function changeWidthAndHeight(width, height) {
    return {
        type: types.CHANGE_WIDTH_AND_HEIGHT,
        width,
        height
    };
}

/*
 * Initialize the app environment, e.g. the browser document attributes that depend on the user's device.
 */
export function initEnv() {
    return dispatch => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.style.overflow = "hidden";
        }

        dispatch(changeIsMobile(isMobile));
        dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));

        window.onresize = () => {
            dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));
        };
    };
}

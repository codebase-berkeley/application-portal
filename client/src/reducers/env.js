import * as types from '../constants/ActionTypes';

const initalState = {
  isMobile: false,
  width: null,
  height: null,
};

export default function environment(state = initalState, action) {
  switch (action.type) {
    case types.CHANGE_IS_MOBILE:
      return { ...state, isMobile: action.isMobile };

    case types.CHANGE_WIDTH_AND_HEIGHT:
      return { ...state, width: action.width, height: action.height };

    default:
      return state;
  }
}

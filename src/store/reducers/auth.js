import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT_SUCCESS, GET_PROFILE_SUCCESS } from '../types/auth';

function initState() {
  return {
    requesting: false,
    user: {}
  };
}

export default function (state = initState(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        requesting: false,
        user: payload.user
      };

    case SIGN_IN_FAILURE:
      return initState();

    case SIGN_OUT_SUCCESS:
      return initState();

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload.user
      };

    default:
      return state;
  }
}

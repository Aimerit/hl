import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE
} from '../types/auth';
import authService from '../services/auth';
import { handleHttpErrorResponse } from '../../api';
import session from '../../utils/session';
import loadingActions from './ui/loading';

function signIn({ credentials, notification, history }) {
  return function (dispatch) {
    dispatch({ type: SIGN_IN_REQUEST });

    authService
      .signIn(credentials)
      .then(({ data: { data } }) => {
        const { user, ...restProps } = data;
        dispatch({ type: SIGN_IN_SUCCESS, payload: { user } });
        session.initSession(restProps);
        history.push('/');
      })
      .catch(handleHttpErrorResponse({ notification, dispatch, errorType: SIGN_IN_FAILURE, hideLoading: false }));
  };
}

function signOut({ history, notification }) {
  return function (dispatch) {
    dispatch({ type: SIGN_OUT_REQUEST });
    dispatch(loadingActions.showLoading());

    authService
      .signOut()
      .then(({ data: { message } }) => {
        dispatch({ type: SIGN_OUT_SUCCESS });
        dispatch(loadingActions.hideLoading());

        session.closeSession();
        history.push('/login');
        notification.showSuccessNotification({ title: 'Logout success', message });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: SIGN_OUT_FAILURE }));
  };
}

function getProfile() {
  return function (dispatch) {
    dispatch({ type: GET_PROFILE_REQUEST });

    authService
      .getProfile()
      .then(({ data: { data } }) => {
        dispatch({ type: GET_PROFILE_SUCCESS, payload: { user: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_PROFILE_FAILURE, hideLoading: false }));
  };
}

export default { signIn, signOut, getProfile };

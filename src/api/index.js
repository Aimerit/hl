import axios from 'axios';

import loadingActions from '../store/actions/ui/loading';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true
});

const jsonContentType = { 'Content-Type': 'application/json' };

function handleHttpErrorResponse({ notification, dispatch, errorType, hideLoading = true }) {
  return function (error) {
    const message = error.response?.data?.message ?? error.message;
    if (dispatch && errorType) dispatch({ type: errorType, payload: { message } });
    if (hideLoading) dispatch(loadingActions.hideLoading());
    if (notification) notification.showErrorNotification({ title: 'An error occurred', message });
  };
}

export { httpClient, jsonContentType, handleHttpErrorResponse };

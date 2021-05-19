import { AUTHENTICATED_KEY, TOKEN_KEY, SESSION_ID_KEY } from '../config/constants';
import { isNullish } from './data_validation';
import cookiesUtils from './cookies';

function isAuthenticated() {
  return getLocalStorageValue(AUTHENTICATED_KEY) && !isNullish(getLocalStorageValue(TOKEN_KEY)) && !isNullish(getLocalStorageValue(SESSION_ID_KEY));
}

function getLocalStorageValue(key) {
  return localStorage.getItem(key);
}

function initSession({ token, session } = {}) {
  localStorage.setItem(AUTHENTICATED_KEY, true);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_ID_KEY, session.id);
  cookiesUtils.setCookie(TOKEN_KEY, token);
  cookiesUtils.setCookie(SESSION_ID_KEY, session.id);
}

function closeSession() {
  localStorage.removeItem(AUTHENTICATED_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_ID_KEY);
  cookiesUtils.removeCookie(TOKEN_KEY);
  cookiesUtils.removeCookie(SESSION_ID_KEY);
}

export default { isAuthenticated, initSession, closeSession };

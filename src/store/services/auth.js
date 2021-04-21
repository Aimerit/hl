import { httpClient, jsonContentType } from '../../api';

import { accountRoles } from '../../utils/enums';

async function signIn(credentials) {
  return httpClient.post('/accounts/sign-in', { ...credentials, role: accountRoles.MANAGER }, { headers: jsonContentType });
}

async function signOut() {
  return httpClient.put('/accounts/sign-out');
}

async function getProfile() {
  return httpClient.get('/accounts/profile');
}

export default { signIn, signOut, getProfile };

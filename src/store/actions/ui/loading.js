import { SHOW_LOADING, HIDE_LOADING } from '../../types/ui/loading';

function showLoading() {
  return { type: SHOW_LOADING };
}

function hideLoading() {
  return { type: HIDE_LOADING };
}

export default { showLoading, hideLoading };

export default {
  initialized: false,
  navigationHistory: {},

  init({ history }) {
    if (this.initialized) return this;

    this.navigationHistory = history;
    this.initialized = true;

    return this;
  },

  handleBackClick() {
    this.navigationHistory.push('/home');
  }
};

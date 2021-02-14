export default {
  initialized: false,
  navigationHistory: {},

  init({ history }) {
    if (this.initialized) return this;

    this.navigationHistory = history;
    this.initialized = true;

    return this;
  },

  handleModuleClick({ url }) {
    this.navigationHistory.push(url);
  }
};

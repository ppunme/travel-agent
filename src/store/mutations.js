export default {
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
};

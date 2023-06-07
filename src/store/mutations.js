export default {
  setUser(state, user) {
    state.user = user;
    state.isLoggedIn = true;
  },
  logout(state) {
    state.user = null;
    state.isLoggedIn = false;
  },
};

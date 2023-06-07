export default {
  login({ commit }, user) {
    commit("setUser", user);
  },
  logout({ commit }) {
    commit("logout");
  },
};

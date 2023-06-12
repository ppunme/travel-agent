export default {
  login({ commit }, user) {
    commit("setUser", user);
  },
  logout({ commit }) {
    commit("logout");
  },
  showToast({ commit }, content) {
    commit("setToast", { ...content, life: 3000 });
  },
};

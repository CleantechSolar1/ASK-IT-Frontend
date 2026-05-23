import { getUsersApi, toggleUserStatusApi } from "@/api/modules/user";

const state = {
  users: [],
  usersLoading: false,
  togglingId: null,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },

  SET_USERS_LOADING(state, val) {
    state.usersLoading = val;
  },

  SET_TOGGLING_ID(state, id) {
    state.togglingId = id;
  },

  UPDATE_USER_STATUS(state, { id, isActive }) {
    const user = state.users.find((u) => u._id === id);
    if (user) user.isActive = isActive;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    commit("SET_USERS_LOADING", true);
    try {
      const res = await getUsersApi();
      commit("SET_USERS", res.data.data);
    } finally {
      commit("SET_USERS_LOADING", false);
    }
  },

  async toggleUserStatus({ commit }, id) {
    commit("SET_TOGGLING_ID", id);
    try {
      const res = await toggleUserStatusApi(id);
      commit("UPDATE_USER_STATUS", {
        id,
        isActive: res.data.data.isActive,
      });
    } finally {
      commit("SET_TOGGLING_ID", null);
    }
  },
};

const getters = {
  users: (state) => state.users,
  usersLoading: (state) => state.usersLoading,
  togglingId: (state) => state.togglingId,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

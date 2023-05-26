import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      users: [],
    };
  },
  actions: {
    async fetchUsers({ commit }) {
      const users = await fetch(
        "https://jsonplaceholder.typicode.com/users/"
      ).then((response) => response.json());
      commit("setUsers", users);
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
});

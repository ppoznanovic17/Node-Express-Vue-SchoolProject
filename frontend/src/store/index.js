import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const baseUrl = 'http://localhost:8080';

export default new Vuex.Store({
  state: {
    log : {},
    users: [],
    posts: []
  },
  mutations: {

    set_log: function (state, log) {
      state.log.id = log.id;
      state.log.username = log.username;
    },
    set_users: function (state, users) {
      state.users = users;
    },
    set_posts: function (state, posts) {
      state.posts = posts;
    },


    add_user: function (state, user) {
      state.users.push(user);
    },
    add_post: function (state, post) {
      state.posts.push(post);
    },

    remove_user: function (state, id) {
      for (let u = 0; u < state.users.length; u++) {
        if (state.users[u].id === id) {
          state.users.splice(u, 1);
          break;
        }
      }
    },
    remove_post: function (state, id) {
      for (let p = 0; p < state.posts.length; p++) {
        if (state.posts[p].id === parseInt(id)) {
          state.posts.splice(p, 1);
          break;
        }
      }
    },

    update_user: function (state, payload) {
      for (let u = 0; u < state.users.length; u++) {
        if (state.users[u].id === parseInt(payload.id)) {
          state.users[u].username = payload.msg.username;
          state.users[u].password = payload.msg.password;
          state.users[u].picture = payload.msg.picture;
          break;
        }
      }
    },
    update_post: function (state, payload) {
      for (let p = 0; p < state.posts.length; p++) {
        if (state.posts[p].id === parseInt(payload.id)) {
          state.posts[p].header = payload.msg.header;
          state.posts[p].content = payload.msg.content;
          break;
        }
      }
    },
    update_log: function (state, payload) {

      if (state.log.id === parseInt(payload.id)) {
        state.log.username = payload.msg.username;
        state.log.password = payload.msg.password;
        state.log.picture = payload.msg.picture;

      }
    }
  },
  actions: {

    load_postsForUser ({ commit }) {
      fetch(  '/profile/:id', { method: 'get' }).then((response) => {
        if (!response.ok)
          alert( response.error().text());

        return response.json()
      }).then((jsonData) => {
        commit('set_users', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    load_users ({ commit }) {
      fetch(  '/wel/users', { method: 'get' }).then((response) => {
        if (!response.ok)
          alert( response.error().text());

        return response.json()
      }).then((jsonData) => {
        commit('set_users', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },
    load_posts: function ({ commit }) {
      fetch(  '/home/posts', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_posts', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_post: function({ commit }, id) {
      fetch(`/profile/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_post', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_post: function({ commit }, post) {
      fetch(`/profile`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: post
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_post', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_user: function({ commit }, user) {
      fetch(`/auth/reg`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_user', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    change_post: function({ commit }, payload) {
      fetch(`/profile/post/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.post
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_post', {id: payload.id, post:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }

  }
})

import firebase from "firebase";

export default {
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },

  getters: {
    user(state){
      return state.user
    }
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      console.log('user', data)

      state.user.data = data;
    },

    UPDATE_USER(state, data) {
      // console.log('UPDATE_USER', data)
      // if ( state.user.loggedIn ) {

      // state.user.data = data;
      // let userData = JSON.stringify(Object.assign(state.user.data, data))
      state.user.data.info = data
      // }
      console.log('UPDATE_USER', data)
      // console.log('UPDATE_USER', userData)
    },

    LOGOUT(state) {
      state.user.loggedIn = false
    },

    CLEAR_USER(state) {
      state.user = {
        loggedIn: false,
        data: null
      }
    }
  },

  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },

    async registation({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          plan: '',
          name
        })
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },

    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        // let info = firebase.database().ref(`/users/${user.uid}`).once('value').then(data => {
        //   return data.val().info
        // })

        commit("SET_USER", {
          email: user.email,
          uid: user.uid,
          info: {}
        })
      } else {
        commit("SET_USER", null);
      }
    },

    updateUser({ commit }, data) {
      if (data) {
        commit("UPDATE_USER", data)
      }
    },

    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('LOGOUT')
    },

    clearUser({ commit }) {
      commit('CLEAR_USER')
    }
  }
}

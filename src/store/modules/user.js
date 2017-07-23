const state = {
  user: null,
  firebaseApp: null,
  firebaseUi: null
}

const mutations = {
  /* eslint-disable no-param-reassign */
  SET_USER (state, user) {
    state.user = user
  },
  SET_FIREBASE_APP (state, firebaseApp) {
    state.firebaseApp = firebaseApp
  },
  SET_FIREBASE_UI (state, firebaseUi) {
    state.firebaseUi = firebaseUi
  }
}

export default {
  state,
  mutations
}

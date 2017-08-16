import * as types from '../mutation-types'

const state = {
  events: []
}

const mutations = {
  [types.FETCH_EVENTS] (state, events) {
    state.events = events
  }
}

export default {
  state,
  mutations
}

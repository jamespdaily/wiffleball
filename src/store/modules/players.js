import * as types from '../mutation-types'

const state = {
  players: []
}

const mutations = {
  [types.FETCH_PLAYERS] (state, players) {
    state.players = players
  }
}

export default {
  state,
  mutations
}

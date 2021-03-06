import * as types from '../mutation-types'

const state = {
  playerStats: []
}

const mutations = {
  [types.FETCH_PLAYER_STATS] (state, playerStats) {
    state.playerStats = playerStats
  }
}

export default {
  state,
  mutations
}

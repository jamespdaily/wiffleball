import * as types from '../mutation-types'
import { services } from '../api'

const state = {
  playerStats: []
}

const mutations = {
  [types.FETCH_PLAYER_STATS] (state, playerStats) {
    state.playerStats = playerStats
  },
  [types.SORT_PLAYER_STATS] (state) {
    services.stats.sortAllStats(state.sortColumn, state.sortKey)
      .then((response) => {
        console.log(response)
        state.playerStats = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export default {
  state,
  mutations
}

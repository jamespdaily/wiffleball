import * as types from '../mutation-types'
import { services } from '../api'

const state = {
  playerStats: [],
  sortColumn: 'full_name',
  sortKey: 'desc'
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
  },
  [types.SET_SORT_COLUMN] (state, sortColumn) {
    state.sortColumn = sortColumn
  },
  [types.SET_SORT_KEY] (state, sortKey) {
    state.sortKey = sortKey
  }
}

export default {
  state,
  mutations
}

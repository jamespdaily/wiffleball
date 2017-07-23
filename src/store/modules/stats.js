import * as types from '../mutation-types'
import _ from 'lodash'

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
    state.playerStats = _.orderBy(state.playerStats, state.sortColumn, state.sortKey)
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

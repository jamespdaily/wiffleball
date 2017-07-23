import * as types from './mutation-types'
import { services } from './api'

export const fetchStats = ({ commit }) => {
  return services.stats.getAllStats()
    .then((response) => {
      console.log(response)
      commit(types.FETCH_PLAYER_STATS, response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const sortStats = ({ commit }) => {
  commit(types.SORT_PLAYER_STATS, 'at_bats', 'desc')
}

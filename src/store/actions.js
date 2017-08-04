import * as types from './mutation-types'
import { services } from './api'

export const LOAD_PLAYER_STATS = ({ commit }) => {
  return services.stats.getAllStats()
    .then((response) => {
      console.log(response)
      commit(types.FETCH_PLAYER_STATS, response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

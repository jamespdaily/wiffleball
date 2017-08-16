import * as types from './mutation-types'
import { services } from './api'

export const FETCH_PLAYER_STATS = ({ commit }) => {
  return services.stats.fetchPlayerStats()
    .then((response) => {
      console.log(response)
      commit(types.FETCH_PLAYER_STATS, response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const FETCH_PLAYERS = ({ commit }) => {
  return services.players.fetchPlayers()
    .then((response) => {
      console.log(response)
      commit(types.FETCH_PLAYERS, response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const FETCH_EVENTS = ({ commit }) => {
  return services.events.fetchEvents()
    .then((response) => {
      console.log(response)
      commit(types.FETCH_EVENTS, response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export const FETCH_YEARS = ({ commit }) => {
  const currentYear = new Date().getFullYear()
  let years = []
  // Loading next year for testing
  for (let year = currentYear + 1; year >= 2010; year--) {
    years.push(year)
  }
  commit(types.SET_YEARS, years)
}

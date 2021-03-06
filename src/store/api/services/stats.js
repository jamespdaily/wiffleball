import axios from 'axios'

export default {
  fetchPlayerStats (request = {}) {
    return axios.get('Player_Stats/?filter[include]=player', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

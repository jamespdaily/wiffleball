import axios from 'axios'

export default {
  fetchPlayers (request = {}) {
    return axios.get('Players?filter[order]=full_name', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

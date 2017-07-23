import axios from 'axios'

export default {
  getAllStats (request = {}) {
    return axios.get('Player_Stats/getPlayerStats?year=All-time&orderBy=full_name ASC', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  sortAllStats (sortColumn, sortKey, request = {}) {
    return axios.get('Player_Stats/getPlayerStats?year=All-time&orderBy=' + sortColumn + ' ' + sortKey, request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

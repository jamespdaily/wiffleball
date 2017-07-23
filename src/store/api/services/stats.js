import axios from 'axios'

export default {
  getAllStats (request = {}) {
    return axios.get('http://localhost:3000/api/Player_Stats/getPlayerStats?year=All-time&orderBy=full_name ASC', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

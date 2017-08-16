import axios from 'axios'

export default {
  fetchEvents (request = {}) {
    return axios.get('Events?filter[order]=created_at desc', request)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}

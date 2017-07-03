import axios from 'axios'

/* eslint no-undef: "off" */
const auth0 = new Auth0({
  domain: 'jamespdaily.auth0.com',
  clientID: '66Csssz3Kg4qEr7INa3oScEj9RS8EgjK',
  responseType: 'token',
  callbackURL: window.location.origin + '/'
})

// login
let login = (username, password) => {
  auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
    scope: 'openid email'},
    function (err) {
      if (err) alert('something went wrong: ' + err.message)
    })
}

// logout
let logout = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}

// checkAuth
let checkAuth = () => {
  if (localStorage.getItem('id_token')) {
    return true
  } else {
    return false
  }
}

// set auth header on start up if token is present
if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
}

// requireAuth
let requireAuth = (to, from, next) => {
  if (!checkAuth()) {
    console.log('auth failed ...')
    let path = '/login'
    let result = auth0.parseHash(window.location.hash)
    if (result && result.idToken) {
      // set token in local storage
      localStorage.setItem('id_token', result.idToken)
      // set auth headers
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      // redirect to home page
      path = '/'
      // get user profile data
      auth0.getProfile(result.idToken, function (err, profile) {
        if (err) {
          // handle error
          alert(err)
        }
        let user = JSON.stringify(profile)
        localStorage.setItem('profile', user)
      })
    }
    next({
      path: path
    })
  } else {
    next()
  }
}

export default {
  checkAuth,
  login,
  logout,
  requireAuth
}

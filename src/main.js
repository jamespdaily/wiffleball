import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import {firebaseAuth, firebaseUi} from './helpers/firebaseConfig'

// Initiate Axios settings to query the REST API
Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.axios.defaults.baseURL = 'https://shielded-cliffs-33205.herokuapp.com/api'
// Vue.axios.defaults.baseURL = 'http://localhost:3000/api'
// No idea what this is
Vue.config.productionTip = false

firebaseAuth.auth().onAuthStateChanged(user => store.commit('SET_USER', user))
store.commit('SET_FIREBASE_APP', firebaseAuth)
store.commit('SET_FIREBASE_UI', firebaseUi)

// Use the Vue Router
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  components: {App},
  el: '#app',
  template: '<App/>',
  data: {},
  created () {
    store.dispatch('fetchStats')
  }
})

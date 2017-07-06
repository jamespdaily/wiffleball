// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Import Vue components
import Roster from './components/Roster'
import Navigation from './components/Navigation'
import Tabular from './components/Tabular'
import Tab from './components/Tab'

// Initiate Axios settings to query the REST API
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:3000/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App, Roster, Navigation, Tabular, Tab}
})

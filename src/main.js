// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Roster from './components/Roster'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Roster },

  data: {
    results: [
      {title: 'the very first post', abstract: 'lorem ipsum some test dimpsum'},
      {title: 'and then there was the second', abstract: 'lorem ipsum some test dimsum'},
      {title: "third time's a charm", abstract: 'lorem ipsum some test dimsum'},
      {title: 'four the last time', abstract: 'lorem ipsum some test dimsum'}
    ]
  }
})

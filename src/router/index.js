import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Roster from '@/components/Roster'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/roster',
      name: 'Wiffleball Roster',
      component: Roster
    }
  ]
})

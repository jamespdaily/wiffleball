import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Roster from '@/components/Roster'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/roster',
      name: 'Wiffleball Roster',
      component: Roster
    }
  ]
})

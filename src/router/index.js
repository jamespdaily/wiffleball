import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Roster from '@/components/Roster'
import Login from '@/components/Login'
import Callback from '@/components/Callback'

Vue.use(Router)

// import auth from '../auth'

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
      name: 'Roster',
      component: Roster
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/callback',
      component: Callback
    }
  ]
})

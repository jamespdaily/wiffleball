import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Roster from '@/components/Roster'
import Login from '@/components/Login'
import Admin from '@/components/Admin'

const router = new VueRouter({
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
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for auth
  next()
})

export default router

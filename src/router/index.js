import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Stats from '@/components/Stats'
import Admin from '@/components/Admin'
import Scores from '@/components/Scores'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/scores',
      name: 'Scores',
      component: Scores
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for auth
  next()
})

export default router

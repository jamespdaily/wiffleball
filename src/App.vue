<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-right">
              <a v-if="isLoggedIn()" class="nav-item">
                <a class="button" @click="logout()">Logout</a>
              </a>
              <a v-if="!isLoggedIn()" class="nav-item">
                <a class="button" @click="login()">Login</a>
              </a>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Wiffleball
          </h1>
          <h2 class="subtitle">
            API Testing
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <navigation></navigation>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import auth from './auth'

  export default {
    components: {Navigation},
    name: 'app',
    methods: {
      logout () {
        auth.logout()
        this.$router.go('/')
      },
      login () {
        this.$router.go('/login')
      },
      isLoggedIn () {
        return auth.checkAuth()
      }
    }
  }
</script>

<style>

</style>

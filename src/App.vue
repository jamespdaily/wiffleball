<template>
  <div id="app">
    <login></login>
    <section class="hero is-primary">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-right">
              <a class="nav-item">
                <a v-if="isLoggedIn()" class="button" @click="handleLogout">Logout</a>
              </a>
              <a class="nav-item">
                <a v-if="!isLoggedIn()" class="button" @click="openModal">Login</a>
              </a>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Wiffleball
          </h1>
          <h2 class="subtitle">
            API Testing
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <navigation>
          <tab name="Home" path="Home" selected="true">sdfsdf</tab>
        </navigation>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import {isLoggedIn, logout} from './auth'
  import eventBus from './EventBus'
  import Login from './components/Login'
  import Tab from './components/Tab'

  export default {
    components: {Navigation, Login, Tab},
    name: 'app',
    methods: {
      handleLogout () {
        logout()
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      openModal () {
        eventBus.$emit('showModal')
      }
    }
  }
</script>

<style>

</style>

<template>
  <div class="container">
    <nav class="tabs is-boxed">
      <ul>
        <li :class="{ 'is-active': tab.isActive }" v-for="tab in navigationTabs">
          <router-link :to="{name: tab.path}" @click.native="selectTab(tab)">
            {{ tab.name }}
          </router-link>
        </li>
        <li><a v-if="!isLoggedIn()" @click="handleLogin">Login</a></li>
        <li><a v-if="isLoggedIn()" @click="handleLogout">Logout</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {isLoggedIn, logout, login} from '../auth'
  import eventBus from '../EventBus'

  export default {
    name: 'navigation',
    components: {isLoggedIn, logout, login},
    data () {
      return {
        navigationTabs: [
          {name: 'Home', path: 'Home', isActive: true},
          {name: 'Rosters', path: 'Roster', isActive: false},
          {name: 'Scores', path: 'Scores', isActive: false},
          {name: 'Shit Talking', path: 'Smack', isActive: false}
        ]
      }
    },
    methods: {
      selectTab (selectedTab) {
        this.navigationTabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab.name)
        })
      },
      handleLogout () {
        logout()
      },
      isLoggedIn () {
        return isLoggedIn()
      },
      handleLogin () {
        login()
      },
      openModal () {
        eventBus.$emit('showModal')
      }
    }
  }
</script>

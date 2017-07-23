<template>
  <div class="container">

    <nav class="tabs is-boxed">
      <ul>
        <li :class="{ 'is-active': tab.isActive }" v-for="tab in navigationTabs" v-if="isAuthorized(tab.name)">
          <router-link :to="{name: tab.path}" @click.native="selectTab(tab.name)">
            {{ tab.name }}
          </router-link>
        </li>
        <li v-if="!user"><a @click="showLoginModal">Login</a></li>
      </ul>
    </nav>

    <modal v-if="showModal" @close="showModal=false">
      <login></login>
    </modal>

  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import Login from './Login'
  import { mapGetters } from 'vuex'
  import Modal from './Modal'

  export default {
    name: 'navigation',

    components: {Login, Modal},

    data () {
      return {
        navigationTabs: [
          {name: 'Home', path: 'Home', isActive: true},
          {name: 'Stats', path: 'Roster', isActive: false},
          {name: 'Scores', path: 'Scores', isActive: false},
          {name: 'Admin', path: 'Admin', isActive: false}
        ],
        showModal: false
      }
    },

    methods: {
      selectTab (selectedTab) {
        this.navigationTabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab)
        })
      },
      showLoginModal () {
        this.showModal = true
      },
      isAuthorized (tabName) {
        if (tabName === 'Admin') {
          return this.user !== null
        } else {
          return true
        }
      }
    },

    computed: {
      ...mapGetters({
        user: 'user'
      })
    },

    created () {
      eventBus.$on('setActiveNavTab', (tabName) => {
        this.selectTab(tabName)
      })
    }
  }
</script>

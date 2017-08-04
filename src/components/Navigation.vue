<template>
  <div class="container">

    <nav class="tabs is-boxed">
      <ul>
        <li :class="{ 'is-active': tab.isActive }" v-for="tab in navigationTabs" v-if="isAuthorized(tab.name)">
          <router-link :to="{name: tab.path}" @click.native="selectTab(tab.name)">
            {{ tab.name }}
          </router-link>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
  import eventBus from '../EventBus'
  import ProfileBarLoggedOut from './ProfileBarLoggedOut'
  import { mapGetters } from 'vuex'

  export default {
    name: 'navigation',

    components: { ProfileBarLoggedOut },

    data () {
      return {
        navigationTabs: [
          {name: 'Home', path: 'Home', isActive: true},
          {name: 'Stats', path: 'Stats', isActive: false},
          {name: 'Scores', path: 'Scores', isActive: false},
          {name: 'Admin', path: 'Admin', isActive: false}
        ]
      }
    },

    computed: {
      ...mapGetters({
        user: 'user'
      })
    },

    methods: {
      selectTab (selectedTab) {
        this.navigationTabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab)
        })
      },
      isAuthorized (tabName) {
        if (tabName === 'Admin') {
          return this.user !== null
        } else {
          return true
        }
      }
    },

    created () {
      eventBus.$on('setActiveNavTab', (tabName) => {
        this.selectTab(tabName)
      })
    }
  }
</script>

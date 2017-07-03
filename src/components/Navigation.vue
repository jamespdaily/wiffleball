<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item"><b>Dab</b></a>
        <router-link v-for="tab in navigationTabs" :to="{name: tab.path}">
          <a :href="tab.href"
             class="nav-item is-tab is-hidden-mobile"
             :class="{ 'is-active': tab.isActive }"
             @click="selectTab(tab)">
            {{ tab.name }}
          </a>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
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
      }
    }
  }
</script>

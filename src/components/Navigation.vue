<template>
  <nav class="tabs is-boxed">
    <ul>
      <li :class="{ 'is-active': tab.isActive }" v-for="tab in navigationTabs">
        <router-link :to="{name: tab.path}" @click.native="selectTab(tab)">
          {{ tab.name }}
        </router-link>
      </li>
    </ul>
    <div class="tabs-component-panels">
      <slot></slot>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navigation',
    data () {
      return {
        navigationTabs: []
      }
    },
    methods: {
      selectTab (selectedTab) {
        this.navigationTabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab.name)
        })
      }
    },
    created () {
      this.navigationTabs = this.$children
    }
  }
</script>

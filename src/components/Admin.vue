<template>
  <div class="container">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Players">
        <players-admin></players-admin>
      </b-tab-item>
      <b-tab-item label="Game Stats">
        <admin-stats></admin-stats>
      </b-tab-item>
      <b-tab-item label="News">
        <edit-events></edit-events>
      </b-tab-item>
    </b-tabs>


  </div>
</template>

<script>
  import PlayersAdmin from './AdminPlayers.vue'
  import BTabItem from '../../node_modules/buefy/src/components/tabs/TabItem.vue'
  import AdminStats from './AdminStats.vue'
  import EditEvents from './EditEvents.vue'

  export default {
    components: {EditEvents, AdminStats, BTabItem, PlayersAdmin},
    name: 'admin',

    data () {
      return {
        activeTab: 0
      }
    }
  }
</script>

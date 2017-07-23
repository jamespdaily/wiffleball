<template>
  <section class="section">
  <div class="container">

    <dropdown label="Season">
      <select v-model="selectedSeason">
        <option>All-time</option>
        <option v-for="year in year">{{ year }}</option>
      </select>
    </dropdown>

    <tabular>
      <template slot="tableHeader">
        <tr>
          <th v-for="header in columnHeaders">
            <a @click="sortBy(header.key)">{{ header.name }}</a>
          </th>
        </tr>
      </template>
      <tr v-for="players in playerStats">
        <td><a @click="openPlayerModal(players.id)">{{ players.full_name }}</a></td>
        <td>{{ players.games_played }}</td>
        <td>{{ (players.average * 1).toFixed(3) }}</td>
        <td>{{ players.hits }}</td>
        <td>{{ players.at_bats }}</td>
        <td>{{ players.runs }}</td>
        <td>{{ players.rbi }}</td>
        <td>{{ players.doubles }}</td>
        <td>{{ players.triples }}</td>
        <td>{{ players.homeruns }}</td>
        <td>{{ players.base_on_balls }}</td>
        <td>{{ players.strikeouts }}</td>
      </tr>
    </tabular>

    <playerbio></playerbio>

  </div>
  </section>
</template>

<script>
  import Tabular from './Tabular'
  import eventBus from '../EventBus'
  import Login from './Login'
  import Playerbio from './PlayerBio.vue'
  import Dropdown from './Dropdown.vue'
  import { mapGetters } from 'vuex'
  import store from '../store/store'
  import * as types from '../store/mutation-types'

  export default {
    name: 'roster',

    components: { Dropdown, Playerbio, Tabular, Login },

    data () {
      return {
        columnHeaders: [
          {name: 'Name', key: 'full_name'},
          {name: 'G', key: 'games_played'},
          {name: 'AVG', key: 'average'},
          {name: 'H', key: 'hits'},
          {name: 'AB', key: 'at_bats'},
          {name: 'R', key: 'runs'},
          {name: 'RBI', key: 'rbi'},
          {name: '2B', key: 'doubles'},
          {name: '3B', key: 'triples'},
          {name: 'HR', key: 'homeruns'},
          {name: 'BB', key: 'base_on_balls'},
          {name: 'SO', key: 'strikeouts'}
        ],
        selectedSeason: 'All-time',
        year: 2017
      }
    },

    computed: {
      ...mapGetters({
        playerStats: 'playerStats',
        sortColumn: 'sortColumn',
        sortKey: 'sortKey'
      })
    },

    methods: {
      sortBy (column) {
        let sortKey
        sortKey = this.sortKey === 'asc' ? 'desc' : 'asc'
        store.commit(types.SET_SORT_COLUMN, column)
        store.commit(types.SET_SORT_KEY, sortKey)
        store.commit(types.SORT_PLAYER_STATS)
      },

      openPlayerModal (playerId) {
        eventBus.$emit('displayPlayerPopup', playerId)
      }
    },

    mounted () {
      eventBus.$emit('setActiveNavTab', 'Stats')
    }
  }
</script>

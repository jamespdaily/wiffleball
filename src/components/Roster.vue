<template>
  <div class="container">
    <div class="field">
      <label class="label">Season</label>
      <p class="control">
    <span class="select">
      <select v-model="selectedSeason" @change="updateData">
        <option>All-time</option>
        <option v-for="year in years">{{ year.year }}</option>
      </select>
    </span>
      </p>
    </div>

    <tabular>
      <template slot="tableHeader">
        <tr>
          <th v-for="header in columnHeaders">
            <a @click="sortBy(header.key)">{{ header.name }}</a>
          </th>
        </tr>
      </template>
      <tr v-for="players in results">
        <td>{{ players.full_name }}</td>
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
  </div>
</template>

<script>
  import Tabular from './Tabular'
  import uniq from 'lodash/uniq'

  export default {
    name: 'roster',

    components: {Tabular},

    data () {
      return {
        results: [],
        years: [],
        columnHeaders: [
          {name: 'Name', key: '1'},
          {name: 'G', key: '2'},
          {name: 'AVG', key: '3'},
          {name: 'H', key: '6'},
          {name: 'AB', key: '4'},
          {name: 'R', key: '5'},
          {name: 'RBI', key: '10'},
          {name: '2B', key: '7'},
          {name: '3B', key: '8'},
          {name: 'HR', key: '9'},
          {name: 'BB', key: '12'},
          {name: 'SO', key: '11'}
        ],
        sortKey: 'full_name',
        sortDirection: 'ASC',
        selectedSeason: 'All-time'
      }
    },
    computed: {
      queryYear () {
        return '?year=' + this.selectedSeason
      },
      querySort () {
        return '&orderBy=' + this.sortKey + ' ' + this.sortDirection
      },
      seasons () {
        return uniq(this.results.map(p => p.season_year))
      }
    },
    methods: {
      sortBy (header) {
        this.sortKey = header
        this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC'
        this.updateData()
      },
      updateData () {
        this.axios.get('Player_Stats/getPlayerStats' + this.queryYear + this.querySort)
          .then(response => {
            this.results = response.data
          })
      }
    },
    mounted () {
      this.axios.get('Player_Stats/getPlayerStats' + this.queryYear + this.querySort)
        .then(response => {
          this.results = response.data
        })

      this.axios.get('Player_Stats/getYears')
        .then(response => {
          this.years = response.data
        })
    }
  }
</script>

<style scoped>

</style>

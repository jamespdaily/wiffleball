<template>
  <div class="container">
    <table class="table is-striped">
      <thead>
      <tr>
        <th v-for="column in columns">
          <a href="#" @click="sortBy">{{ column }}</a>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="team in results">
        <td>1</td>
        <td>{{ team.team_name }}</td>
        <td>50</td>
        <td>25</td>
        <td>25</td>
        <td>50%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'roster',

    data () {
      return {
        columns: ['Rank', 'team_name', 'Played', 'Wins', 'Losses', 'Win %'],
        results: [],
        sortKey: 'team_name',
        reverse: false
      }
    },

    mounted () {
      this.axios.get('Teams?filter[include]=players&filter[order]=' + this.sortKey)
        .then(response => {
          this.results = response.data
        })
    },

    methods: {
    }
  }
</script>

<style scoped>

</style>

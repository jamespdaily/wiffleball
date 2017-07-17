<template>
  <div class="container">
  <modal v-if="showModal" @close="showModal=false">
      <div class="box">
        <article class="media">
        <figure class="media-left">
          <p class="image is-128x128">
            <img :src="selectedPlayer[0].photo">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p><strong>Name: </strong>{{ selectedPlayer[0].full_name }}</p>
            <p><strong>Age: </strong></p>
            <p><strong>Experience: </strong>5 Seasons</p>
          </div>
        </div>
        </article>
      <br>
      <tabular>
        <template slot="tableHeader">
          <tr>
            <th v-for="header in columnHeaders">
              {{ header.name }}
            </th>
          </tr>
        </template>
          <tr v-for="stats in playerStats" v-if="stats.player_id === selectedPlayerId">
            <td>{{ stats.season_year }}</td>
            <td>{{ stats.games_played }}</td>
            <td>{{ (stats.hits / stats.at_bats).toFixed(3) }}</td>
            <td>{{ stats.hits }}</td>
            <td>{{ stats.at_bats }}</td>
            <td>{{ stats.runs }}</td>
            <td>{{ stats.rbi }}</td>
            <td>{{ stats.doubles }}</td>
            <td>{{ stats.triples }}</td>
            <td>{{ stats.homeruns }}</td>
            <td>{{ stats.base_on_balls }}</td>
            <td>{{ stats.strikeouts }}</td>
          </tr>
      </tabular>
      </div>

    </modal>
  </div>

</template>

<script>
  import Modal from './Modal'
  import eventBus from '../EventBus'
  import Tabular from './Tabular'

  export default {
    name: 'playerbio',

    components: { Modal, Tabular },

    data () {
      return {
        playerStats: [],
        players: [],
        showModal: false,
        selectedPlayerId: '',
        columnHeaders: [
          {name: 'Year', key: '1'},
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
        ]
      }
    },

    methods: {
      updatePlayerStats () {
        this.axios.get('Player_Stats?filter[order]=season_year DESC')
          .then(response => {
            this.playerStats = response.data
          })
      },

      updatePlayers () {
        this.axios.get('Players')
          .then(response => {
            this.players = response.data
          })
      }
    },

    computed: {
      selectedPlayer () {
        return this.players.filter(player => {
          return player.id.indexOf(this.selectedPlayerId) > -1
        })
      }
    },

    created () {
      this.updatePlayerStats()
      this.updatePlayers()

      eventBus.$on('displayPlayerPopup', (playerId) => {
        this.selectedPlayerId = playerId
        this.showModal = true
        return this.showModal
      })
    }
  }
</script>

<template>
  <div class="card">
    <div class="card-content">
      <article class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="players.photo">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p><strong>Name: </strong>{{ players.full_name }}</p>
          <p><strong>Age: </strong></p>
          <p><strong>Experience: </strong>{{ playerSeasonCount }} season</p>
        </div>
      </div>
      </article>
      <b-table
        :data="playerStats"
        :bordered="isBordered"
        :striped="isStriped"
        :narrowed="isNarrowed"
        :checkable="isCheckable"
        :loading="isLoading"
        :mobile-cards="hasMobileCards"
        :paginated="isPaginated"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        default-sort="['season_year', 'desc']"
        :selected.sync="selected"
        :checked-rows.sync="checkedRows">

        <template scope="props">
          <b-table-column field="season_year" label="Year" sortable numeric>
            {{ props.row.season_year }}
          </b-table-column>
          <b-table-column field="games_played" label="G" sortable numeric>
            {{ props.row.games_played }}
          </b-table-column>
          <b-table-column field="average" label="AVG" sortable numeric>
            {{ (props.row.hits / props.row.at_bats).toFixed(3) }}
          </b-table-column>
          <b-table-column field="hits" label="H" sortable numeric>
            {{ props.row.hits }}
          </b-table-column>
          <b-table-column field="at_bats" label="AB" sortable numeric>
            {{ props.row.at_bats }}
          </b-table-column>
          <b-table-column field="runs" label="R" sortable numeric>
            {{ props.row.runs }}
          </b-table-column>
          <b-table-column field="rbi" label="RBI" sortable numeric>
            {{ props.row.rbi }}
          </b-table-column>
          <b-table-column field="doubles" label="2B" sortable numeric>
            {{ props.row.doubles }}
          </b-table-column>
          <b-table-column field="triples" label="3B" sortable numeric>
            {{ props.row.triples }}
          </b-table-column>
          <b-table-column field="homeruns" label="HR" sortable numeric>
            {{ props.row.homeruns }}
          </b-table-column>
          <b-table-column field="base_on_balls" label="BB" sortable numeric>
            {{ props.row.base_on_balls }}
          </b-table-column>
          <b-table-column field="strikeouts" label="SO" sortable numeric>
            {{ props.row.strikeouts }}
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>

</template>

<script>
  import eventBus from '../EventBus'

  export default {
    name: 'playerbio',

    props: {
      selectedPlayerId: {
        required: true
      }
    },

    data () {
      return {
        playerStats: [],
        players: [],
        showModal: false,

        // Table Settings
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
        ],
        checkedRows: [],
        selected: {},
        isBordered: false,
        isStriped: true,
        isNarrowed: true,
        isCheckable: false,
        isLoading: false,
        hasMobileCards: true,
        isPaginated: false,
        isPaginationSimple: true,
        perPage: 50
      }
    },

    computed: {
      playerSeasonCount () {
        return this.playerStats.length
      }
    },

    methods: {
      updatePlayers () {
        this.axios.get('Players/' + this.selectedPlayerId + '?filter[order]=season_year DESC')
          .then(response => {
            this.players = response.data
          })
      },

      updatePlayerStats () {
        this.axios.get('Players/' + this.selectedPlayerId + '/playerStats?filter[order]=season_year DESC')
          .then(response => {
            this.playerStats = response.data
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

<template>
  <div class="card">
    <div class="card-content">
      <article class="media">
        <figure class="media-left">
          <p class="image is-128x128">
            <img :src="playerPhoto">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p><strong>Name: </strong>{{ playerName }}</p>
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
        default-sort="season_year"
        :selected.sync="selected"
        :checked-rows.sync="checkedRows">

        <template slot-scope="props">
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
        <template slot="footer" v-if="!isCustom">
          <div class="has-text-right">
            Footer
          </div>
        </template>
        <template slot="footer" v-else>
          <th class="is-hidden-mobile" style="width:40px">
            <div class="th-wrap is-numeric"> ID </div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap"> First Name </div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap"> Last Name </div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap is-centered"> Date </div>
          </th>
          <th class="is-hidden-mobile">
            <div class="th-wrap"> Gender </div>
          </th>
        </template>
      </b-table>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'playerbio',

    props: {
      selectedPlayerId: {
        required: true
      }
    },

    data () {
      return {
        showModal: false,
        playerStats: [],
        player: [],
        playerName: '',
        playerPhoto: '',

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
      fetchPlayers () {
        this.axios.get('Players/' + this.selectedPlayerId)
          .then(response => {
            this.playerName = response.data.full_name
            this.playerPhoto = response.data.photo
            this.player = response.data
          })
      },

      fetchPlayerStats () {
        this.axios.get('Players/' + this.selectedPlayerId + '/playerStats')
          .then(response => {
            this.playerStats = response.data
          })
      }
    },

    created () {
      this.isLoading = true
      this.fetchPlayerStats()
      this.fetchPlayers()
      this.isLoading = false
    }
  }
</script>

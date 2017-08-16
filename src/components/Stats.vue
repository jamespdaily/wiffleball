<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <b-field>
            <b-select placeholder="Season" icon="date_range" v-model="selectedYear" @input="fetchAggregatePlayerStats">
              <option value="All-time">All-Time</option>
              <option
                v-for="year in years"
                :value="year"
                :key="year">
                {{ year }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
    <br>

    <div class="container">
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
        default-sort="full_name"
        :selected.sync="selected"
        :checked-rows.sync="checkedRows">

        <template scope="props">
          <b-table-column field="full_name" label="Name" sortable>
            <a @click="openPlayerModal(props.row.id)">{{ props.row.full_name }}</a>
          </b-table-column>
          <b-table-column field="games_played" label="G" sortable numeric>
            {{ props.row.games_played }}
          </b-table-column>
          <b-table-column field="average" label="AVG" sortable numeric>
            {{ props.row.average }}
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

      <b-modal :active.sync="showModal" has-modal-card>
        <playerbio :selectedPlayerId="selectedPlayerId"></playerbio>
      </b-modal>

    </div>

  </section>
</template>

<script>
  import eventBus from '../EventBus'
  import Playerbio from './PlayerBio.vue'
  import BTableColumn from '../../node_modules/buefy/src/components/table/TableColumn.vue'
  import BTable from '../../node_modules/buefy/src/components/table/Table.vue'
  import axios from 'axios'

  export default {
    name: 'stats',

    components: {BTable, BTableColumn, Playerbio},

    data () {
      return {
        // Data
        selectedYear: 'All-time',
        years: [],
        playerStats: [],
        selectedPlayerId: '',

        // Modal Settings
        showModal: false,

        // Table Settings
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

    methods: {
      initializePlayerStats () {
        this.updateSeasonDropdown()
        this.fetchAggregatePlayerStats()
      },
      openPlayerModal (playerId) {
        this.selectedPlayerId = playerId
        this.showModal = true
      },
      updateSeasonDropdown () {
        const currentYear = new Date().getFullYear()
        for (let year = currentYear; year >= 2010; year--) {
          this.years.push(year)
        }
        this.years.push(2018)
      },
      fetchAggregatePlayerStats () {
        this.isLoading = true
        axios.get('Player_Stats/getPlayerStats?year=' + this.selectedYear + '&orderBy=full_name ASC')
          .then((response) => {
            Promise.resolve(response)
            this.playerStats = response.data
            this.isLoading = false
          })
          .catch((error) => Promise.reject(error))
      }
    },

    mounted () {
      eventBus.$emit('setActiveNavTab', 'Stats')
      this.initializePlayerStats()
    }
  }
</script>

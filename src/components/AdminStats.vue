<template>
  <div class="container">

    <b-field grouped>
      <b-field>
        <b-select placeholder="Season" icon="date_range" v-model="selectedSeason" @input="loadPlayerStats">
          <option
            v-for="year in years"
            :value="year"
            :key="year">
            {{ year }}
          </option>
        </b-select>
      </b-field>

      <b-field>
        <p class="control">
          <button class="button is-primary" @click="editPlayerStats('create', null)">
            <b-icon icon="add"></b-icon>
            <span>Add Stats</span>
          </button>
        </p>
      </b-field>
    </b-field>

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
      default-sort="player.full_name"
      :selected.sync="selected"
      :checked-rows.sync="checkedRows">

      <template scope="props">
        <b-table-column field="player.full_name" label="Name" sortable>
          {{ props.row.player.full_name }}
        </b-table-column>
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
        <b-table-column field="edit" label="Edit" width="15">
          <a @click="editPlayerStats('update', props.row.id)">
            <b-icon icon="edit"></b-icon>
          </a>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active.sync="showModal" has-modal-card :can-cancel="false">
      <edit-stats :selectedPlayerStatsId="selectedPlayerStatsId" :type="editPlayerStatsType"></edit-stats>
    </b-modal>

  </div>

</template>

<script>
  import BTableColumn from '../../node_modules/buefy/src/components/table/TableColumn.vue'
  import BTable from '../../node_modules/buefy/src/components/table/Table.vue'
  import axios from 'axios'
  import EditStats from './EditStats.vue'
  import eventBus from '../EventBus'
  import BField from '../../node_modules/buefy/src/components/field/Field.vue'

  export default {
    name: 'admin-stats',

    components: {BField, EditStats, BTable, BTableColumn},

    data () {
      return {
        selectedSeason: '',
        years: [],
        playerStats: [],
        selectedPlayerStatsId: '',
        editPlayerStatsType: '',

        // Modal Settings
        showModal: false,

        // Auto-complete Settings
        keepFirst: true,
        name: '',
        filterSelected: null,

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
      editPlayerStats (type, playerStatsId = null) {
        this.editPlayerStatsType = type
        this.selectedPlayerStatsId = playerStatsId
        this.showModal = true
      },
      updateSeasonDropdown () {
        const currentYear = new Date().getFullYear()
        for (let year = currentYear; year >= 2010; year--) {
          this.years.push(year)
        }
        this.years.push(2018)
        this.selectedSeason = currentYear
      },
      loadPlayerStats () {
        this.isLoading = true
        axios.get('Player_Stats?filter[where][season_year]=' + this.selectedSeason + '&filter[include]=player')
          .then((response) => {
            Promise.resolve(response)
            this.playerStats = response.data
            this.isLoading = false
          })
          .catch((error) => Promise.reject(error))
      },
      initializeAdminStats () {
        this.updateSeasonDropdown()
        this.loadPlayerStats()
      }
    },

    mounted () {
      eventBus.$on('reloadPlayerStats', () => {
        this.loadPlayerStats()
      })
    },

    created () {
      this.initializeAdminStats()
    }
  }
</script>

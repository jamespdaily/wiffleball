<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <b-dropdown v-model="selectedSeason" @change="loadPlayerStats">
            <button class="button is-primary" type="button" slot="trigger">
              <template>
                <b-icon icon="date_range"></b-icon>
                <span>{{ selectedSeason }}</span>
              </template>
              <b-icon icon="arrow_drop_down"></b-icon>
            </button>

            <b-dropdown-option value="All-time">
              <h3>All-time</h3>
            </b-dropdown-option>
            <hr class="dropdown-divider">
            <b-dropdown-option v-for="year in years" :value="year" :key="year">
              <h3>{{ year }}</h3>
            </b-dropdown-option>

          </b-dropdown>
        </div>
        <div class="column">
          <b-field >
            <b-autocomplete
              v-model="test.name"
              icon="search"
              placeholder="Type some stuff here"
              :keep-first="keepFirst"
              :data="filteredDataObj"
              field="user.first_name"
              @select="option => filterSelected = option">
            </b-autocomplete>
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
              {{ (props.row.average * 1).toFixed(3) }}
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
    name: 'roster',

    components: {BTable, BTableColumn, Playerbio},

    data () {
      return {
        selectedSeason: 'All-time',
        years: [],
        playerStats: [],
        selectedPlayerId: '',

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
        perPage: 50,
        test: {
          data: [
            {
              'id': 1,
              'user': {'first_name': 'Jesse', 'last_name': 'Simmons'},
              'date': '2016-10-15 13:43:27',
              'gender': 'Male'
            },
            {
              'id': 2,
              'user': {'first_name': 'John', 'last_name': 'Jacobs'},
              'date': '2016-12-15 06:00:53',
              'gender': 'Male'
            },
            {
              'id': 3,
              'user': {'first_name': 'Tina', 'last_name': 'Gilbert'},
              'date': '2016-04-26 06:26:28',
              'gender': 'Female'
            },
            {
              'id': 4,
              'user': {'first_name': 'Clarence', 'last_name': 'Flores'},
              'date': '2016-04-10 10:28:46',
              'gender': 'Male'
            },
            {
              'id': 5,
              'user': {'first_name': 'Anne', 'last_name': 'Lee'},
              'date': '2016-12-06 14:38:38',
              'gender': 'Female'
            }
            // ...
          ],
          name: ''
        }
      }
    },

    computed: {
      filteredDataObj () {
        return this.test.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.test.name.toLowerCase()) >= 0
        })
      }
    },

    methods: {
      openPlayerModal (playerId) {
        this.selectedPlayerId = playerId
        this.showModal = true
      },
      updateSeasonDropdown () {
        const currentYear = new Date().getFullYear()
        for (let year = currentYear; year >= 2010; year--) {
          this.years.push(year)
        }
      },
      loadPlayerStats () {
        axios.get('Player_Stats/getPlayerStats?year=' + this.selectedSeason + '&orderBy=full_name ASC')
          .then((response) => {
            Promise.resolve(response)
            this.playerStats = response.data
          })
          .catch((error) => Promise.reject(error))
      }
    },

    mounted () {
      eventBus.$emit('setActiveNavTab', 'Stats')
      this.updateSeasonDropdown()
      this.loadPlayerStats('All-time')
    }
  }
</script>

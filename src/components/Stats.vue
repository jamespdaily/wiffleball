<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-1 is-offset-9">
          <b-dropdown v-model="selectedSeason">
            <button class="button is-primary" type="button" slot="trigger">
              <template>
                <b-icon icon="date_range"></b-icon>
                <span>{{ selectedSeason }}</span>
              </template>
              <b-icon icon="arrow_drop_down"></b-icon>
            </button>

            <b-dropdown-option value="Career">
              <h3>Career</h3>
            </b-dropdown-option>
            <hr class="dropdown-divider">
            <b-dropdown-option v-for="year in years" :value="year">
              <h3>{{ year }}</h3>
            </b-dropdown-option>

          </b-dropdown>
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
              <a @click="openPlayerModal(players.id)">{{ props.row.full_name }}</a>
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
      <playerbio></playerbio>
    </div>

  </section>
</template>

<script>
  import eventBus from '../EventBus'
  import Playerbio from './PlayerBio.vue'
  import { mapGetters } from 'vuex'
  import BTableColumn from '../../node_modules/buefy/src/components/table/TableColumn.vue'
  import BTable from '../../node_modules/buefy/src/components/table/Table.vue'

  export default {
    name: 'roster',

    components: {BTable, BTableColumn, Playerbio},

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
        years: [],

        // Table Settings
        checkedRows: [],
        selected: {},
        isBordered: false,
        isStriped: true,
        isNarrowed: true,
        isCheckable: false,
        isLoading: false,
        hasMobileCards: true,
        isPaginated: true,
        isPaginationSimple: true,
        perPage: 50
      }
    },

    computed: {
      ...mapGetters({
        playerStats: 'playerStats'
      })
    },

    methods: {
      openPlayerModal (playerId) {
        eventBus.$emit('displayPlayerPopup', playerId)
      },
      updateSeasonDropdown () {
        const currentYear = new Date().getFullYear()

        for (let year = currentYear; year >= 2010; year--) {
          this.years.push(year)
        }
      }
    },

    mounted () {
      eventBus.$emit('setActiveNavTab', 'Stats')
      this.updateSeasonDropdown()
    }
  }
</script>

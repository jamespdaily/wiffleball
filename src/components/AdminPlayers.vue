<template>
  <div class="container">
    <b-table
      :data="players"
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
        <b-table-column field="season_year" label="Year" sortable numeric>
          {{ props.row.season_year }}
        </b-table-column>
      </template>

    </b-table>
  </div>

</template>

<script>
  export default {
    name: 'players-admin',

    data () {
      return {
        players: [],

        // Table Settings
        checkedRows: [],
        selected: {},
        isBordered: false,
        isStriped: true,
        isNarrowed: true,
        isCheckable: false,
        isLoading: false,
        hasMobileCards: true,
        isPaginated: false,
        isPaginationSimple: false,
        perPage: 10
      }
    },

    methods: {
      updatePlayerData () {
        this.axios.get('/Players')
          .then(response => {
            this.players = response.data
          })
      }
    },

    created () {
      this.updatePlayerData()
    }
  }
</script>

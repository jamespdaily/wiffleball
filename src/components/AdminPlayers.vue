<template>
  <div class="container">
    <div class="field is-grouped is-grouped-right">
    <button class="button is-primary" type="button" @click="editPlayer('newPlayer')">
      <b-icon icon="add"></b-icon>
      <span>Add Player</span>
    </button>
    </div>

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
        <b-table-column field="full_name" label="Name" sortable>
          {{ props.row.full_name }}
        </b-table-column>
        <b-table-column field="first_name" label="First Name" sortable>
          {{ props.row.first_name }}
        </b-table-column>
        <b-table-column field="last_name" label="Last Name" sortable>
          {{ props.row.last_name }}
        </b-table-column>
        <b-table-column field="nickname" label="Nickname" sortable>
          {{ props.row.nickname }}
        </b-table-column>
        <b-table-column field="birthdate" label="Birthdate" sortable>
          {{ props.row.birthdate }}
        </b-table-column>
        <b-table-column field="last_updated" label="Last Updated" sortable>
          {{ (props.row.updated_at) }}
        </b-table-column>
        <b-table-column field="photo" label="Photo" width="10">
          <a @click="popupPhoto(props.row.photo)">
            <b-icon icon="photo">
            </b-icon>
          </a>
        </b-table-column>
        <b-table-column field="edit" label="Edit" width="10">
          <a @click="editPlayer('updatePlayer', props.row.id)">
            <b-icon icon="edit">
            </b-icon>
          </a>
        </b-table-column>
      </template>

    </b-table>

    <b-modal :active.sync="showModal" has-modal-card :canCancel=false>
      <edit-player :type="editPlayerType" :selectedPlayerId="selectedPlayerId"></edit-player>
    </b-modal>
  </div>

</template>

<script>
  import EditPlayer from './EditPlayer.vue'
  import BIcon from '../../node_modules/buefy/src/components/icon/Icon.vue'
  import eventBus from '../EventBus'

  export default {
    components: {BIcon, EditPlayer},

    name: 'players-admin',

    data () {
      return {
        players: [],
        selectedPlayerId: '',
        editPlayerType: '',

        // Modal Settings
        showModal: false,

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

    computed: {

    },

    methods: {
      fetchPlayerData () {
        this.isLoading = true
        this.axios.get('/Players')
          .then(response => {
            this.players = response.data
            this.isLoading = false
          })
      },
      popupPhoto (photoUrl) {
        this.$dialog.alert({
          message: '<figure class="image is-square"><img src="' + photoUrl + '"/></figure>'
        })
      },
      editPlayer (type, playerId = null) {
        this.editPlayerType = type
        this.selectedPlayerId = playerId
        this.showModal = true
      }
    },

    created () {
      this.fetchPlayerData()
    },

    mounted () {
      eventBus.$on('reloadPlayerData', () => {
        this.fetchPlayerData()
      })
    }
  }
</script>

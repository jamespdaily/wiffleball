<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        <b-icon icon="account" size="is-medium"/>
        <span>{{ modalTitle }}</span>
      </p>
    </header>
    <section class="modal-card-body">

      <b-field label="Full Name *">
        <b-field type="is-primary">
          <b-input expanded
                   v-model="full_name"
                   placeholder="Enter full name"
                   required>
          </b-input>
          <p class="control">
            <button class="button is-danger is-outlined" @click="full_name = null">
              <b-icon icon="close"/>
            </button>
          </p>
        </b-field>
      </b-field>

      <b-field label="First Name">
        <b-field>
          <b-input expanded
                   v-model="first_name"
                   placeholder="Enter First Name">
          </b-input>
          <p class="control">
            <button class="button is-danger is-outlined" @click="first_name = null">
              <b-icon icon="close"/>
            </button>
          </p>
        </b-field>
      </b-field>

      <b-field label="Last Name">
        <b-field>
          <b-input expanded
                   v-model="last_name"
                   placeholder="Enter Last Name">
          </b-input>
          <p class="control">
            <button class="button is-danger is-outlined" @click="last_name = null">
              <b-icon icon="close"/>
            </button>
          </p>
        </b-field>
      </b-field>

      <b-field label="Nickname">
        <b-field>
          <b-input expanded
                   v-model="nickname"
                   placeholder="Enter Nickname">
          </b-input>
          <p class="control">
            <button class="button is-danger is-outlined" @click="nickname = null">
              <b-icon icon="close"/>
            </button>
          </p>
        </b-field>
      </b-field>

      <div class="columns">
        <div class="column">
          <b-field label="Birthdate">
            <b-field>
              <b-datepicker v-model="birth_date"
                            placeholder="Click to select..."
                            icon="calendar">
              </b-datepicker>
              <p class="control">
                <button class="button is-danger is-outlined" @click="birth_date = null">
                  <b-icon icon="close"/>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column is-half">
          <b-field label="Age">
            <b-input v-model="age" disabled/>
          </b-field>
        </div>
      </div>

      <b-field>
        <b-upload v-model="dropFiles" drag-drop multiple="false">
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon
                  icon="upload"
                  size="is-large">
                </b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <div class="tags">
        <span v-for="(file, index) in dropFiles"
              :key="index"
              class="tag is-primary">
            {{file.name}}
            <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
            </button>
        </span>
      </div>

    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="closePlayerModal()">
        <b-icon icon="cancel"/>
        <span>Close</span>
      </button>
      <button class="button is-success" @click="savePlayer()" :disabled="full_name === null" :loading="isLoading">
        <b-icon icon="check"/>
        <span>Save</span>
      </button>
    </footer>
  </div>
</template>

<script>
  import BField from '../../node_modules/buefy/src/components/field/Field.vue'
  import BInput from '../../node_modules/buefy/src/components/input/Input.vue'
  import BIcon from '../../node_modules/buefy/src/components/icon/Icon.vue'
  import eventBus from '../EventBus'

  export default {
    components: {BIcon, BInput, BField},

    name: 'edit-player',

    data () {
      return {
        full_name: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        nickname: null,
        photo: null,
        lastUpdated: null,
        isLoading: null,

        dropFiles: []
      }
    },

    props: {
      selectedPlayerId: '',
      type: ''
    },

    computed: {
      modalTitle () {
        if (this.type === 'newPlayer') {
          return 'Add New Player'
        } else {
          return 'Edit Player'
        }
      },
      age () {
        let now = new Date()
        return this.birth_date !== null ? this.diff_years(this.birth_date, now) : null
      }
    },

    methods: {
      fetchPlayers () {
        this.axios.get('Players/' + this.selectedPlayerId + '?filter[order]=season_year DESC')
          .then(response => {
            this.full_name = response.data.full_name
            this.first_name = response.data.first_name
            this.last_name = response.data.last_name
            this.birth_date = response.data.birth_date
            this.nickname = response.data.nickname
            this.photo = response.data.photo
            this.lastUpdated = response.data.updated_at
          })
      },
      updatePlayer () {
        this.isLoading = true
        this.axios.patch('Players/' + this.selectedPlayerId, {
          full_name: this.full_name,
          first_name: this.first_name,
          last_name: this.last_name,
          birth_date: this.birth_date,
          nickname: this.nickname,
          photo: this.photo
        })
          .then(function (response) {
            console.log(response)
            this.isLoading = false
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      createPlayer () {
        this.axios.post('Players/', {
          full_name: this.full_name,
          first_name: this.first_name,
          last_name: this.last_name,
          birth_date: this.birth_date,
          nickname: this.nickname,
          photo: this.photo
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      savePlayer () {
        if (this.type === 'newPlayer') {
          this.createPlayer()
        } else {
          this.updatePlayer()
        }
        this.$snackbar.open(this.full_name + ' has been saved')
      },
      diff_years (dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000
        diff /= (60 * 60 * 24)
        return Math.abs(Math.round(diff / 365.25))
      },
      closePlayerModal () {
        eventBus.$emit('reloadPlayerData')
        this.$parent.close()
      },
      deleteDropFile (index) {
        this.dropFiles.splice(index, 1)
      }
    },

    mounted () {
      if (this.type !== 'newPlayer') {
        this.fetchPlayers()
      }
    }
  }
</script>

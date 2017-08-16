<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <b-field grouped position="is-centered">
        <b-field label="Player Name" type="is-primary">
          <b-select required placeholder="Select Player" icon="person"
                    v-model="playerId"
                    :disabled="this.type === 'update'" @type="search">
            <option v-for="player in players"
              :value="player.id"
              :key="player.id">
              {{ player.full_name }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Year" type="is-primary">
          <b-select placeholder="Select Year" icon="date_range" v-model="year" required
                    :disabled="this.type === 'update'">
            <option
              v-for="year in years"
              :value="year"
              :key="year">
              {{ year }}
            </option>
          </b-select>
        </b-field>
      </b-field>
    </header>

    <section class="modal-card-body">
      <div class="columns is-centered">
        <div class="column">
          <b-field label="Games Played">
            <b-field>
              <b-input expanded
                       v-model="gamesPlayed"
                       placeholder="G"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="gamesPlayed = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="At Bats">
            <b-field>
              <b-input expanded
                       v-model="atBats"
                       placeholder="AB"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="atBats = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Hits">
            <b-field>
              <b-input expanded
                       v-model="hits"
                       placeholder="H"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="hits = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>


        <div class="column">
          <b-field label="Average">
            <b-field>
              <b-input expanded
                       v-model="average"
                       placeholder="AVG"
                       type="integer"
                       disabled>
              </b-input>
            </b-field>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="Runs">
            <b-field>
              <b-input expanded
                       v-model="runs"
                       placeholder="R"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="runs = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="RBI">
            <b-field>
              <b-input expanded
                       v-model="rbi"
                       placeholder="RBI"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="rbi = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Doubles">
            <b-field>
              <b-input expanded
                       v-model="doubles"
                       placeholder="2B"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="doubles = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Triples">
            <b-field>
              <b-input expanded
                       v-model="triples"
                       placeholder="3B"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="triples = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="Homeruns">
            <b-field>
              <b-input expanded
                       v-model="homeruns"
                       placeholder="HR"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="homeruns = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Base on Balls">
            <b-field>
              <b-input expanded
                       v-model="baseOnBalls"
                       placeholder="BB"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="baseOnBalls = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="Strikeouts">
            <b-field>
              <b-input expanded
                       v-model="strikeouts"
                       placeholder="SO"
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined" @click="strikeouts = null">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>

        <div class="column">
          <b-field label="PLACEHOLDER FOR ALIGNMENT" v-if="false">
            <b-field>
              <b-input expanded
                       type="number"
                       min="0"
                       :disabled="isDisabled">
              </b-input>
              <p class="control">
                <button class="button is-danger is-outlined">
                  <b-icon icon="clear"></b-icon>
                </button>
              </p>
            </b-field>
          </b-field>
        </div>
      </div>

    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="closePlayerStatsModal()">
        <b-icon icon="cancel"></b-icon>
        <span>Close</span>
      </button>
      <button class="button is-success" @click="savePlayerStats()" :disabled="isDisabled" :is-loading="isLoading">
        <b-icon icon="save"></b-icon>
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
  import { mapGetters } from 'vuex'
  import BAutocomplete from '../../node_modules/buefy/src/components/autocomplete/Autocomplete.vue'

  export default {
    components: {BAutocomplete, BIcon, BInput, BField},

    name: 'edit-stats',

    data () {
      return {
        // Stats Data
        fullName: null,
        gamesPlayed: null,
        atBats: null,
        runs: null,
        hits: null,
        doubles: null,
        triples: null,
        homeruns: null,
        rbi: null,
        strikeouts: null,
        baseOnBalls: null,
        year: null,
        playerId: null,
        isLoading: false
      }
    },

    computed: {
      ...mapGetters({
        players: 'players',
        years: 'years'
      }),
      average () {
        return (this.hits / this.atBats).toFixed(3)
      },
      isDisabled () {
        return this.fullName === null && this.year === null
      }
    },

    props: [
      'selectedPlayerStatsId',
      'type'
    ],

    methods: {
      fetchPlayerStats () {
        this.axios.get('Player_Stats/' + this.selectedPlayerStatsId + '?filter[include]=player')
          .then(response => {
            this.fullName = response.data.player.full_name
            this.gamesPlayed = response.data.games_played
            this.atBats = response.data.at_bats
            this.runs = response.data.runs
            this.hits = response.data.hits
            this.doubles = response.data.doubles
            this.triples = response.data.triples
            this.homeruns = response.data.homeruns
            this.rbi = response.data.rbi
            this.strikeouts = response.data.strikeouts
            this.baseOnBalls = response.data.base_on_balls
            this.year = response.data.season_year
            this.playerId = response.data.player_id
          })
      },
      updatePlayerStats () {
        this.isLoading = true
        this.axios.patch('Player_Stats/' + this.selectedPlayerStatsId, {
          season_year: this.year,
          games_played: this.gamesPlayed,
          at_bats: this.atBats,
          runs: this.runs,
          hits: this.hits,
          doubles: this.doubles,
          triples: this.triples,
          homeruns: this.homeruns,
          rbi: this.rbi,
          strikeouts: this.strikeouts,
          base_on_balls: this.baseOnBalls
        })
          .then(function (response) {
            console.log(response)
            this.isLoading = false
          })
          .catch(function (error) {
            console.log(error)
            this.isLoading = false
          })
      },
      createPlayerStats () {
        this.isLoading = true
        this.axios.post('Player_Stats/', {
          player_id: this.playerId,
          season_year: this.year,
          games_played: this.gamesPlayed,
          at_bats: this.atBats,
          runs: this.runs,
          hits: this.hits,
          doubles: this.doubles,
          triples: this.triples,
          homeruns: this.homeruns,
          rbi: this.rbi,
          strikeouts: this.strikeouts,
          base_on_balls: this.baseOnBalls
        })
          .then(function (response) {
            console.log(response)
            this.isLoading = false
          })
          .catch(function (error) {
            console.log(error)
            this.isLoading = false
          })
      },
      savePlayerStats () {
        if (this.type === 'create') {
          this.createPlayerStats()
        } else {
          this.updatePlayerStats()
        }
        this.$snackbar.open('Stats have been saved')
      },
      closePlayerStatsModal () {
        eventBus.$emit('reloadPlayerStats')
        this.$parent.close()
      }
    },

    mounted () {
      if (this.type === 'update') {
        this.fetchPlayerStats()
      }
    }
  }
</script>

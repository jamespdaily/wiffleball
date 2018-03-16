<template>
  <section class="section">
    <b-field label="Title" expanded>
      <b-input placeholder="Enter a Title" v-model="eventTitle"></b-input>
    </b-field>

    <b-field label="Message" expanded>
      <b-input type="textarea" placeholder="Enter a Message" v-model="eventMessage"></b-input>
    </b-field>
    <button class="button is-danger" @click="clearEvent()">
      <b-icon icon="cancel"></b-icon>
      <span>Clear</span>
    </button>
    <button class="button is-success" @click="saveEvent()" :disabled="isDisabled" :loading="isLoading">
      <b-icon icon="check"></b-icon>
      <span>Save</span>
    </button>
    <br><br>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../store/store'

  export default {
    name: 'edit-events',
    store,
    data () {
      return {
        eventTitle: '',
        eventMessage: '',
        isLoading: false
      }
    },
    computed: {
      ...mapGetters({
        user: 'user'
      }),
      isDisabled () {
        return this.eventTitle.length === 0 || this.eventMessage.length === 0
      }
    },
    methods: {
      saveEvent () {
        this.createEvent()
        this.$snackbar.open('Message has been saved')
        this.clearEvent()
      },
      clearEvent () {
        this.eventTitle = ''
        this.eventMessage = ''
      },
      createEvent () {
        this.isLoading = true
        this.axios.post('Events/', {
          event_title: this.eventTitle,
          event_text: this.eventMessage,
          event_author: 'dilly dilly' // this.user.displayName
        })
          .then(function (response) {
            console.log(response)
            store.dispatch('FETCH_EVENTS')
            this.isLoading = false
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

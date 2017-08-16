<template>
  <section class="section">
    <div class="container">
      <b-message :title="event.event_title" v-for="event in events" :closable=false :key="event.id">
        <p>{{ event.event_text }}</p>
        <p class="is-size-7 has-text-right">
          Posted by: {{ event.event_author }} at {{ formatDate(event.created_at) }}
        </p>
      </b-message>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'

  export default {
    name: 'home',

    data () {
      return {
        isCollapsible: true
      }
    },

    computed: {
      ...mapGetters({
        events: 'events'
      })
    },
    methods: {
      formatDate (date) {
        return moment(date).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

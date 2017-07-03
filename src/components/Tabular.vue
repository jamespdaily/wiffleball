<template>
  <table class="table is-striped is-narrow">
    <thead>
    <tr>
      <th v-for="headers in header">{{ headers }}</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <slot name="tableFooter">
        <th v-for="footers in header">{{ footers }}</th>
      </slot>
    </tr>
    </tfoot>
    <tbody>
    <tr>
      <td v-for="team in teamStats">{{ team }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>

  export default {
    name: 'tabular',

    data () {
      return {
        headerFormats: {
          standings: ['Team', 'Wins', 'Losses', 'PCT', 'GB'],
          stats: ['Number', 'Player', 'Position', 'RBI', 'HR']
        }
      }
    },

    computed: {
      header () {
        return this.headerFormats[this.type]
      }
    },

    props: {
      type: {required: true},
      team: {required: true}
    }
  }

</script>

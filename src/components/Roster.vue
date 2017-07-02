<template>
  <section class="section">
    <div class="container">
    <div class="columns">
      <div class="column" v-for="result in results">
        <article class="message">
          <div class="message-header">
            <p>{{ result.division_name }}</p>
          </div>
          <div class="message-body">
            <p>{{ result.abstract }}</p>
          </div>
        </article>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'roster',

    data () {
      return {
        results: []
      }
    },
    mounted () {
      this.axios.get('divisions').then(response => {
        this.results = response.data
      })
    }
  }
</script>

<style scoped>

</style>

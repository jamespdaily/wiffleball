<template>
  <section class="section">
    <div class="container">
    <div class="columns">
      <div class="column" v-for="result in results">
        <article class="message">
          <div class="message-header">
            <p>{{ result.title }}</p>
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
        results: [
          {title: 'the very first post', abstract: 'lorem ipsum some test dimpsum'},
          {title: 'and then there was the second', abstract: 'lorem ipsum some test dimsum'},
          {title: "third time's a charm", abstract: 'lorem ipsum some test dimsum'},
          {title: 'four the last time', abstract: 'lorem ipsum some test dimsum'}
        ]
      }
    },

    mounted () {
      axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=your_api_key')
        .then(response => {
          this.results = response.data.results
        })
    }
  }
</script>

<style scoped>

</style>

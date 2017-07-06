<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Wiffleball
          </h1>
          <h2 class="subtitle">
            API Testing
          </h2>
        </div>
      </div>

      <div class="hero-foot">
        <navigation>
        </navigation>
      </div>
    </section>

    <section class="section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'

  export default {
    components: {Navigation},
    name: 'app',
    methods: {}
  }
</script>

<style>

</style>

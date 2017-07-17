<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <figure class="image is-128x128"><img src="../static/wiffleball_logo.jpg"></figure>
          </h1>
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

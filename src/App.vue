<template>
  <div id="app">
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <figure class="image is-128x128"><img src="../static/wiffleball_logo.jpg"></figure>
            </div>
            <div class="level-item">
              <p class="subtitle is-3">Mongy Memorial Wiffleball Tournament</p>
            </div>
          </div>
        </nav>
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

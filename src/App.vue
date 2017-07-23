<template>
  <div id="app">

  <profile-bar></profile-bar>

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

      <router-view></router-view>

  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import ProfileBar from './components/ProfileBar'

  export default {
    components: {Navigation, ProfileBar},
    name: 'app',
    methods: {}
  }
</script>

<style>

</style>

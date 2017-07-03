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
    </section>

    <navigation>
    </navigation>

    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'

  export default {
    components: {Navigation},
    name: 'app'
  }
</script>

<style>

</style>

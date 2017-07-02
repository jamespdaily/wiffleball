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
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <b>Wiffle</b>
          </a>
          <a class="nav-item is-tab is-hidden-mobile is-active">Teams</a>
          <a class="nav-item is-tab is-hidden-mobile">Players</a>
          <a class="nav-item is-tab is-hidden-mobile">Divisions</a>
        </div>
        <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet is-active">Teams</a>
          <a class="nav-item is-tab is-hidden-tablet">Players</a>
          <a class="nav-item is-tab is-hidden-tablet">Divisions</a>
        </div>
      </div>
    </nav>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

</style>

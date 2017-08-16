<template>
  <div id="app">

  <profile-bar v-if="user"></profile-bar>
  <profile-bar-logged-out v-if="!user"></profile-bar-logged-out>

    <section class="hero is-primary is-bold">
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

    <footer class="footer">
      <div class="container has-text-centered">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <p>
            <b-icon icon="payment"></b-icon>
            <a href="https://paypal.me/JamesDaily" target="_blank">Donate</a>
          </p>
        </div>
        <div class="column is-narrow">
          <p>
            <b-icon icon="email"></b-icon>
            <a>Contact</a>
          </p>
        </div>
      </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import Navigation from './components/Navigation'
  import ProfileBar from './components/ProfileBarLoggedIn'
  import ProfileBarLoggedOut from './components/ProfileBarLoggedOut'
  import { mapGetters } from 'vuex'
  import BIcon from '../node_modules/buefy/src/components/icon/Icon.vue'

  export default {
    components: {BIcon, ProfileBarLoggedOut, Navigation, ProfileBar},

    name: 'app',

    computed: {
      ...mapGetters({
        user: 'user'
      })
    }
  }
</script>

<style>

</style>

<template>
  <div class="container">
    <nav class="navbar" v-if="user">
      <div class="navbar-end">
        <div class="navbar-item">
          <p>{{ user.displayName }}</p>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <img :src="user.photoURL" width="32" height="38">
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="firebaseLogout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'profilebar',

  computed: {
    ...mapGetters({
      user: 'user'
    })
  },

  methods: {
    firebaseLogout () {
      firebase.auth().signOut()
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="container is-fluid">
      <div class="navbar-menu">
        <div class="navbar-end">
          <b-dropdown position="is-bottom-left" hoverable>
            <a class="navbar-item" slot="trigger">
              <span>{{ user.displayName }}</span>
              <span><img :src="user.photoURL" width="32" height="38"></span>
              <b-icon icon="arrow_drop_down"></b-icon>
            </a>

            <b-dropdown-option>Players</b-dropdown-option>
            <b-dropdown-option>Teams</b-dropdown-option>
            <b-dropdown-option>Rosters</b-dropdown-option>
            <b-dropdown-option separator></b-dropdown-option>
            <b-dropdown-option @click="firebaseLogout">
              <b-icon icon="exit_to_app"></b-icon>
              Logout
            </b-dropdown-option>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import BDropdownOption from '../../node_modules/buefy/src/components/dropdown/DropdownOption.vue'

export default {
  components: {BDropdownOption},

  name: 'profilebar',

  computed: {
    ...mapGetters({
      user: 'user'
    })
  },

  methods: {
    firebaseLogout () {
      this.$router.go('/')
      firebase.auth().signOut()
    }
  }
}
</script>

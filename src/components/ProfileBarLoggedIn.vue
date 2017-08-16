<template>
  <div class="container">
    <nav class="navbar">
      <div class="container is-fluid">
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <b-dropdown position="is-bottom-left">
              <a class="navbar-item" slot="trigger">
                <img :src="user.photoURL" width="32" height="38">
                <b-icon icon="arrow_drop_down"></b-icon>
              </a>
              <b-dropdown-item custom>{{ user.displayName }}</b-dropdown-item>
              <b-dropdown-item separator></b-dropdown-item>
              <b-dropdown-item @click="firebaseLogout">
                <b-icon icon="exit_to_app"></b-icon>
                Logout
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  import BDropdownItem from '../../node_modules/buefy/src/components/dropdown/DropdownItem.vue'

  export default {
    components: {BDropdownItem},

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

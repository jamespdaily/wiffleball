<template>
  <nav class="navbar">

    <div class="navbar-menu">
      <div class="navbar-end">
        <b-dropdown position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <span>Login</span>
            <b-icon icon="arrow_drop_down"></b-icon>
          </a>

          <b-dropdown-option subheader paddingless>
            <form action="">
              <div class="modal-card" style="width:300px;">
                <section class="modal-card-body">
                  <div id="firebaseui-auth-container"></div>
                </section>
              </div>
            </form>
          </b-dropdown-option>
        </b-dropdown>
      </div>
    </div>

  </nav>
</template>

<script>
  import firebase from 'firebase'
  import { mapGetters } from 'vuex'

  export default {
    name: 'profile-bar-logged-out',

    data () {
      return {
        uiConfig: {
          signInSuccessUrl: '/',
          signInFlow: 'popup',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
          ]
        }
      }
    },

    computed: {
      ...mapGetters({
        firebaseUi: 'firebaseUi'
      })
    },

    mounted () {
      this.firebaseUi.start('#firebaseui-auth-container', this.uiConfig)
    },

    destroyed () {
      this.firebaseUi.reset()
    }
  }
</script>

<style scoped>
  @import url('../../node_modules/firebaseui/dist/firebaseui.css');
</style>

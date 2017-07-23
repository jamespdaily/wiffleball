<template>
  <div class="box">
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { mapGetters } from 'vuex'
  import Modal from './Modal'

  export default {
    name: 'login',

    components: { Modal },

    data () {
      return {
        showModal: false,
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

    methods: {
      showModal () {
        this.showModal = true
      }
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

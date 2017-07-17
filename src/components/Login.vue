<template>
  <div class="container">
    <modal v-if="showModal" @close="showModal=false">
      <template slot="header">Login</template>

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="email" placeholder="E-mail" v-model="email">
          <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="pass">
          <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
        </p>
      </div>

      <template slot="footer">
        <button class="button is-primary" @click="handleLogin">Login</button>
        <button class="button is-danger" @click="showModal=false">Close</button>
      </template>
    </modal>
  </div>
</template>

<script>
  import {login} from '../auth'
  import Modal from './Modal'

  export default {
    components: {Modal},
    name: 'login',
    data () {
      return {
        email: '',
        pass: '',
        showModal: false
      }
    },
    methods: {
      handleLogin () {
        login()
      }
    }
  }
</script>

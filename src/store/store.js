import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters,
  actions
})

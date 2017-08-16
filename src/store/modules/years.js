import * as types from '../mutation-types'

const state = {
  years: []
}

const mutations = {
  [types.SET_YEARS] (state, years) {
    state.years = years
  }
}

export default {
  state,
  mutations
}

import { indexRouter } from '../../router/index'

const state = {
  currentActivePath: ''
}

const getters = {
  currentActivePath(state) {
    return state.currentActivePath
  }
}

const actions = {

}

// mutations
const mutations = {
  setActivePath(state, data) {
    console.log(data);
    state.currentActivePath = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

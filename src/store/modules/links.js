import { indexRouter } from '../../router/index'

const state = {
  links: []
}

const getters = {
  links(state) {
    return state.links
  }
}

const actions = {

}

// mutations
const mutations = {
  addLink(state, link) {
    if (!state.links.find(item => item.url === link.url)) {
      state.links.push(link)
    }
  },
  deleteLink(state, link) {
    state.links = state.links.filter(item => item.url !== link.url)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

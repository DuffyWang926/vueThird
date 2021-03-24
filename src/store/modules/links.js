import { indexRouter } from '../../router/index'

const state = {
  links: [],
  currentLink: ''
}

const getters = {
  links(state) {
    return state.links
  },
  currentLink(state) {
    return state.currentLink
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
    state.currentLink = link.url
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

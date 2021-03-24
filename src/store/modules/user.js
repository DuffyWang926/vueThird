import { loginApi } from '@/api/login'
const state = {
  userName: '',
}
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({
      id,
      quantity
    }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
}

const actions = {
  login({
    commit,
    state
  }, products) {
    return new Promise((resolve, reject) => {
      loginApi(products).then(response => {
        const data = response;
		
        commit('loginUser',products)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
}

// mutations
const mutations = {
  loginUser(state,data) {
    console.log(state,data)
    const { name } = data
    state.userName = name
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { loginApi } from '@/api/login'
const state = { //此时数据由接口文档给定

  token: window.localStorage.getItem('token') || '',
  username: window.localStorage.getItem('username') || '',
  rights: JSON.parse(window.localStorage.getItem('rights')) || []
}

const getters = { //是store的计算属性
  /*
  const getters = {
    cartProducts: (state, getters, rootState) => {
      return state.items.map(({ id, quantity }) => {
        const product = rootState.products.all.find(product => product.id === id)
        return {
          title: product.title,
          price: product.price,
          quantity
        }
      })
    },*/
  //  loginInfo: (state) => {
  //    return state.rights.item.map(({id, checked}) => {
  //      const checked = state.rights.all.find(checked => checked.value === true)
  //      const unchecked = state.rights.all.find(checked => checked.value === false)
  //      const nuchecked =

  //  }
  getToken(state) {
    return state.token
  },

  getRightById: (state) => (id) => {
    const right = state.rights.find(item => item.id == id)
    if (right != null) {
      return right.checked
    } else {
      return null
    }
  },
  getUsername(state) {
    return state.username
  },

  getRights(state) {
    return state.rights
  }
}

const actions = { //异步修改数据，axios请求之后对mutation调用
  //action提交的是mutation，而不是直接变更状态；action可以包含任意异步操作
  login({
    commit,
    state
  }, loginForm) {
    return new Promise((resolve, reject) => {
      loginApi(loginForm).then(response => {
        const data = response;
        console.log(response);
        // commit('LOGIN_INFO',)
        commit('loginMutation', response.data)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
}

// mutations
const mutations = { //更改state的唯一方法

  loginMutation(state, data) {
    console.log(state, data)
    state.token = data.token
    state.username = data.username
    state.rights = data.rights
    window.localStorage.setItem('token', state.token)
    window.localStorage.setItem('rights', JSON.stringify(state.rights))
    window.localStorage.setItem('username', state.username)
  },

  logoutMutation(state) {
    state.token = ''
    state.username = ''
    state.rights = null
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('rights')
    window.localStorage.removeItem('username')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

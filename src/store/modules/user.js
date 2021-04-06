import { loginApi, menuApi } from '@/api/login'
import { ElMessage } from 'element-plus'
const state = {
  //此时数据由接口文档给定

  access_token: window.localStorage.getItem('access_token') || '',
  refresh_token: window.localStorage.getItem('refresh_token') || '',
  token_type: window.localStorage.getItem('token_type') || '',
  expires_in: window.localStorage.getItem('expires_in') || '',
  scope: window.localStorage.getItem('scope') || '',
  username: window.localStorage.getItem('username') || '',
  rights: JSON.parse(window.localStorage.getItem('rights')) || [],
  // rights: [],
  jti: window.localStorage.getItem('jti') || ''
}

const getters = {
  //是store的计算属性
  getToken(state) {
    return state.access_token
  },

  getTokenType(state) {
    return state.token_type
  },

  getRefreshToken(state) {
    return state.refresh_token
  },

  getExpiresIn(state) {
    return state.expires_in
  },

  getScope(state) {
    return state.scope
  },

  getJti(state) {
    return state.jti
  },

  getRightById: state => id => {
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

const actions = {
  //异步修改数据，axios请求之后对mutation调用
  //action提交的是mutation，而不是直接变更状态；action可以包含任意异步操作
  login({ commit, state }, loginForm) {
    return new Promise((resolve, reject) => {
      loginApi(loginForm)
        .then(response => {
          // const data = response
          console.log(response)
          if (response.status == 0) {
            commit('loginMutation', response.data)
            console.log(menuApi)
            menuApi().then(res => {
              commit('menuMutation', res.data)
              if (res.status == 0) {
                ElMessage.success({
                  message: '您已成功登录',
                  type: 'success',
                  center: true
                })
              }
              resolve()
            })
          }
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

// mutations
const mutations = {
  //更改state的唯一方法

  loginMutation(state, data) {
    console.log(state, data)
    state.access_token = data.access_token
    state.token_type = data.token_type
    state.refresh_token = data.refresh_token
    state.expires_in = data.expires_in
    state.scope = data.scope
    state.jti = data.jti

    // state.username = data.username
    // state.rights = data.rights
    window.localStorage.setItem('access_token', state.access_token)
    window.localStorage.setItem('token_type', state.token_type)
    window.localStorage.setItem('refresh_token', state.refresh_token)
    window.localStorage.setItem('expires_in', state.expires_in)
    window.localStorage.setItem('scope', state.scope)
    window.localStorage.setItem('jti', state.jti)

    // window.localStorage.setItem('rights', JSON.stringify(state.rights))
    // window.localStorage.setItem('username', state.username)
  },

  logoutMutation(state) {
    state.access_token = ''
    state.token_type = ''
    state.refresh_token = ''
    state.expires_in = ''
    state.scope = ''
    state.jti = ''

    state.username = ''
    state.rights = null

    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('token_type')
    window.localStorage.removeItem('refresh_token')
    window.localStorage.removeItem('expires_in')
    window.localStorage.removeItem('scope')
    window.localStorage.removeItem('jti')

    window.localStorage.removeItem('rights')
    window.localStorage.removeItem('username')
  },
  menuMutation(state, data) {
    const { username, rights } = data
    state.rights = rights
    state.username = username
    window.localStorage.setItem('username', username)
    window.localStorage.setItem('rights', JSON.stringify(rights))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { createStore } from 'vuex'

import user from './modules/user'

export default createStore({
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production'
})

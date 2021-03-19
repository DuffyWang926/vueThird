import { createStore } from 'vuex'

import user from './modules/user'
import menu from './modules/menu'
import links from './modules/links'

export default createStore({
  modules: {
    user,
    menu,
    links
  },
  strict: process.env.NODE_ENV !== 'production'
})

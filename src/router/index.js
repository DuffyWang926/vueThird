import { createRouter, createWebHistory } from 'vue-router'
// import { mapMutations, useStore } from 'vuex'
import store from '../store/index'

const indexRouter = {
  path: '/',
  component: () => import('@/views/index'),
  redirect: '/index',
  children: []
}

const routes = [
  indexRouter,
  {
    path: '/nopermission',
    name: 'nopermission',
    meta: {
      index: 1
    },
    component: () => import('@/views/error/NoPermission')
  },
  {
    path: '/index',
    name: 'home',
    meta: {
      index: 1
    },
    component: () => import('@/views/index'),
  },
  {
    path: '/*',
    name: '404',
    meta: {
      index: 1
    },
    component: () => import('@/views/error/404')
  },
  {
    path: '/memberManagement',
    name: 'memberManagement',
    meta: {
      index: 1
    },
    component: () => import('@/views/memberManagement/index')
  },
]

console.log(store);

// const setActivePath = mapMutations(['menu/setActivePath'])['menu/setActivePath']
// console.log(setActivePath);
// debugger
const routerContext = require.context('./modules', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  indexRouter.children = [...indexRouter.children, ...(routerModule.default || routerModule)]
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  console.log(to);
  to.matched.forEach(item => {
    if (item.meta.index === 2) {
      parent = item.path
      console.log('setActivePath', item.path)
      store.commit('menu/setActivePath', item.path)
    }
    if (item.meta.index === 3) {
      console.log('pushLink', {
        url: item.path,
        title: item.meta.title,
      })
      store.commit('links/addLink', {
        url: to.fullPath,
        title: item.meta.title,
      })
    }
  })
})


export default router

export {
  indexRouter
}
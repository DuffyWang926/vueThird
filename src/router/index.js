
import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('@/views/error/NoPermission')
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

const routerContext = require.context('./modules', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  indexRouter.children = [...indexRouter.children, ...(routerModule.default || routerModule)]
})


export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

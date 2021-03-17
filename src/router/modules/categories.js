export default [
  {
    path: '/category',
    name: 'category',
    meta: {
      index: 2
    },
    component: () => import('@/views/category/index'),
    children: [
      {
        path: '/categoryFirst',
        name: 'categoryFirst',
        component: () => import('@/views/category/firstCategory/index')
      },
      {
        path: '/categorySecond',
        name: 'categorySecond',
        component: () => import('@/views/category/secondCategory/index')
      },
      {
        path: '/categoryThird',
        name: 'categoryThird',
        component: () => import('@/views/category/thirdCategory/index')
      }
    ]
  }

]
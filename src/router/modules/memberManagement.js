export default [
  {
    path: '/memberManagement',
    name: 'memberManagement',
    redirect: '/memberWithCard', //重定向
    meta: {
      index: 2,
      title: '会员绑卡信息',
      parent: '会员管理',
      id: 2,
      sort: 2
    },
    component: () => import('@/views/memberManagement/index'),
    children: [
      {
        path: '/detail/:id', //动态路由
        name: 'detail',
        component: () => import('@/views/memberManagement/detail/index')
      },
      {
        path: '/memberWithCard',
        name: 'memberWithCard',
        component: () => import('@/views/memberManagement/memberWithCard/index')
      }
    ]
  }
]

export default [
  {
    path: '/getAdminList',
    name: 'users',
    redirect: '/usersManage',
    meta: {
      index: 2,
      id: 4,
      title: '账户管理',
      parent: '安全管理',
      sort: 2
    },
    component: () => import('@/views/users/index'),
    children: [
      {
        path: '/usersManage',
        name: 'usersManage',
        component: () => import('@/views/users/manage/index'),
        meta: {
          index: 3,
          title: '账户管理'
        }
      }
    ]
  }
]

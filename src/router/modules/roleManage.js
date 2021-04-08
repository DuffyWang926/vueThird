export default [
  {
    path: '/role',
    name: 'role',
    meta: {
      index: 2,
      id: 2,
      title: '权限管理',
      parent: '安全管理',
      sort: 1
    },
    redirect: '/roleManage',
    component: () => import('@/views/role/index'),
    children: [
      {
        path: '/roleManage',
        name: 'roleManage',
        component: () => import('@/views/role/manage/index'),
        meta: {
          index: 3,
          title: '权限管理'
        }
      }
    ]
  }
]

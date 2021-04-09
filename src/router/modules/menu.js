export default [
  {
    path: '/getMenus',
    name: 'menus',
    redirect: '/menusManage',
    meta: {
      index: 2,
      id: 3,
      title: '菜单管理',
      parent: '安全管理',
      sort: 2
    },
    component: () => import('@/views/menus/index'),
    children: [
      {
        path: '/menusManage',
        name: 'menusManage',
        component: () => import('@/views/menus/manage/index'),
        meta: {
          index: 3,
          title: '菜单管理'
        }
      }
    ]
  }
]

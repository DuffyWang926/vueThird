export default [
  {
    path: '/groupList',
    name: 'groupList',
    meta: {
      index: 2,
      id: 7,
      title: '拼团列表',
      parent: '营销管理',
      sort: 2
    },
    component: () => import('@/views/groupList/index'),
    // component: () => import('@/views/groupBuy/index'),
    children: [
      {
        path: '/groupList/:id',
        name: 'groupListId',
        component: () => import('@/views/groupList/groupList/index'),
        meta: {
          index: 3,
          title: '拼团列表'
        }
      },
      {
        path: '/groupList',
        name: 'groupListNoId',
        component: () => import('@/views/groupList/groupList/index'),
        // component: import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '拼团列表'
        }
      }
    ]
  }
]

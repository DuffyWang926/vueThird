export default [
  {
    path: '/groupBuy',
    name: 'groupBuy',
    redirect: '/groupBuyManage',
    meta: {
      index: 2,
      id: 52,
      title: '团购管理',
      parent: '营销管理',
      sort: 2
    },
    component: () => import('@/views/groupBuy/index'),
    children: [
      {
        path: '/groupBuyManage',
        name: 'groupBuyManage',
        component: () => import('@/views/groupBuy/manage/index'),
        meta: {
          index: 3,
          title: '团购管理'
        }
      },
      {
        path: '/groupBuyAdd',
        name: 'groupBuyAdd',
        component: () => import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '添加团购'
        }
      },
      {
        path: '/groupBuyEdit',
        name: 'groupBuyEdit',
        component: () => import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '修改团购'
        }
      },
      {
        path: '/groupList/:id',
        name: 'groupList',
        component: () => import('@/views/groupBuy/groupList/index'),
        meta: {
          index: 3,
          title: '拼团列表'
        }
      }
    ]
  }
]

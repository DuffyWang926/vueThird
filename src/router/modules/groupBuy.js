export default [
  {
    path: '/groupBuy',
    name: 'groupBuy',
    redirect: '/groupBuyManage',
    meta: {
      index: 2,
      id: 2,
      title: '团购管理',
      parent: '营销管理',
      sort: 1
    },
    component: () => import('@/views/groupBuy/index'),
    children: [
      {
        path: '/groupBuyManage',
        name: 'groupBuyManage',
        component: () => import('@/views/groupBuy/manage/index'),
        meta: {
          index: 3,
          title: '团购管理',
          keepAlive: true
        }
      },
      {
        path: '/groupBuyAdd',
        name: 'groupBuyAdd',
        component: () => import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '添加团购',
          keepAlive: true
        }
      },
      {
        path: '/groupBuyEdit/:id',
        name: 'groupBuyEdit',
        props: true,
        component: () => import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '修改团购',
          keepAlive: true
        }
      }
    ]
  }
]

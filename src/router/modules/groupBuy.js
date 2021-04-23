export default [
  {
    path: '/getgroupbuylist',
    name: 'groupBuy',
    redirect: '/groupBuyManage',
    meta: {
      index: 2,
      id: 6,
      title: '拼团管理',
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
          title: '拼团管理',
          keepAlive: true
        }
      },
      {
        path: '/groupBuyAdd',
        name: 'groupBuyAdd',
        component: () => import('@/views/groupBuy/add/index'),
        meta: {
          index: 3,
          title: '添加拼团',
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
          title: '修改拼团',
          keepAlive: true
        }
      }
    ]
  }
]

export default [
  {
    path: '/rulesStatement',
    name: 'rulesStatement',
    redirect: '/list',
    meta: {
      index: 2,
      id: 40,
      title: '规则政策说明',
      parent: '系统配置',
      sort: 1
    },
    component: () => import('@/views/rulesStatement/index'),
    children: [
      {
        path: '/list',
        name: 'list',
        component: () => import('@/views/rulesStatement/list/index'),
        meta: {
          index: 3,
          title: '规则政策列表'
        }
      },
      {
        path: '/userAgreement',
        name: 'userAgreement',
        component: () => import('@/views/rulesStatement/userAgreement/index'),
        meta: {
          index: 3,
          title: '用户协议编辑'
        }
      }
/*      {
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
      } */
    ]
  }
]

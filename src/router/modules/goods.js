export default [
  {
    path: '/goods',
    name: 'goods',
    redirect: '/goodsManage',
    meta: {
      index: 2,
      id: 52,
      title: '商品管理',
      parent: '商城管理',
      sort: 2
    },
    component: () => import('@/views/goods/index'),
    children: [
      {
        path: '/goodsManage',
        name: 'goodsManage',
        component: () => import('@/views/goods/manage/index'),
        meta: {
          index: 3,
          title: '商品管理'
        }
      },
      {
        path: '/goodsAdd',
        name: 'goodsAdd',
        component: () => import('@/views/goods/add/index'),
        meta: {
          index: 3,
          title: '添加商品'
        }
      }
    ]
  }

]
export default [
  {
    path: '/restrictRegion',
    name: 'restrictRegion',
    meta: {
      index: 2,
      id: 53,
      title: '限售区域管理',
      parent: '商城管理',
      sort: 3
    },
    redirect: '/restrictRegionManage',
    component: () => import('@/views/restrictRegion/index'),
    children: [
      {
        path: '/restrictRegionManage',
        name: 'restrictRegionManage',
        component: () => import('@/views/restrictRegion/manage/index'),
        meta: {
          index: 3,
          title: '限售区域管理'
        }
      },
      {
        path: '/restrictRegionToAddRule',
        name: 'restrictRegionToAddRule',
        component: () => import('@/views/restrictRegion/toAddRule/index'),
        meta: {
          index: 3,
          title: '限售区域增加'
        }
      }
    ]
  }

]

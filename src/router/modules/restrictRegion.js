export default [
  {
    path: '/restrictRegion',
    name: 'restrictRegion',
    meta: {
      index: 2
    },
    component: () => import('@/views/restrictRegion/index'),
    children: [
      {
        path: '/restrictRegionManage',
        name: 'restrictRegionManage',
        component: () => import('@/views/restrictRegion/manage/index')
      },
      {
        path: '/restrictRegionToAddRule',
        name: 'restrictRegionToAddRule',
        component: () => import('@/views/restrictRegion/toAddRule/index')
      }
    ]
  }

]

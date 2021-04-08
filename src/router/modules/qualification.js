export default [
  {
    path: '/qualification',
    name: 'qualification',
    meta: {
      index: 2,
      id: 2,
      title: '资质管理',
      parent: '系统配置',
      sort: 5
    },
    redirect: '/qualificationManage',
    component: () => import('@/views/qualification/index'),
    children: [
      {
        path: '/qualificationManage',
        name: 'qualificationManage',
        component: () => import('@/views/qualification/manage/index'),
        meta: {
          index: 3,
          title: '资质管理'
        }
      }
    ]
  }
]

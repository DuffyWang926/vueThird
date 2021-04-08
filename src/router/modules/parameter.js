export default [
  {
    path: '/parameter',
    name: 'parameter',
    meta: {
      index: 2,
      id: 2,
      title: '系统参数设置',
      parent: '系统配置',
      sort: 1
    },
    redirect: '/parameterManage',
    component: () => import('@/views/parameter/index'),
    children: [
      {
        path: '/parameterManage',
        name: 'parameterManage',
        component: () => import('@/views/parameter/manage/index'),
        meta: {
          index: 3,
          title: '系统参数设置'
        }
      }
    ]
  }
]

export default [
  {
    path: '/hotWord',
    name: 'hotWord',
    meta: {
      index: 2,
      title: '热搜词管理',
      parent: '系统配置',
      id: 1,
      sort: 1
    },
    component: () => import('@/views/hotWord/index')
  }
]

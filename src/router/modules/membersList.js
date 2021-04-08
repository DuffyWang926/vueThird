export default [
    {
    path: '/memberList',
    name: 'memberList',
    meta: {
      index: 2,
      title: '会员列表',
      parent: '会员管理',
      sort:1,
      id: 2
    },
    component: () => import('@/views/memberList/index')
   /* children: [
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/memberManagement/detail/index'),
      },
      {
        path: '/memberWithCard',
        name: 'memberWithCard',
        component: () => import('@/views/memberManagement/memberWithCard/index'),
      }
    ] */
  }
 ]

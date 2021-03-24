export default [
    {
    path: '/memberManagement',
    name: 'memberManagement',
    meta: {
      index: 2,
      
    },
    component: () => import('@/views/memberManagement/index'),
    children: [
      {
        path: '/detail/:id',//动态路由
        name: 'detail',
        component: () => import('@/views/memberManagement/detail/index'),
      },
      {
        path: '/memberWithCard',
        name: 'memberWithCard',
        component: () => import('@/views/memberManagement/memberWithCard/index'),
      }
    ]
  }
 ]

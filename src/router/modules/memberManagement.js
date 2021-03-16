export default [
    {
    path: '/memberManagement',
    name: 'memberManagement',
    meta: {
      index: 2
    },
    component: () => import('@/views/memberManagement/index'),
    children: [
      {
        //path: 'detail/1',//当配合后端接口时，路径应为下者，但由于后端不可用，在调试页面效果时，先用这句代替
        path: 'detail',
        components: {
          default: () => import('@/views/memberManagement'),
          detail: () => import('@/views/memberManagement/detail')
        },
        props: {
          detail: true
        }
      },

      /* 确定二级路由页面的重定向,重定向一般放在路由配置的最后*/
      {
        path: '/membersManagement',
        redirect: '/membersManagement/index'
      },
    ]

  }
 ]

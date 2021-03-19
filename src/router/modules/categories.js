export default [
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/index'),
    meta: {
      index: 2, // 等级2的路由代表左侧的一个可点击的菜单项（如：商品分类管理）
      id: 51, // 该权限对应的ID，用于生成菜单栏时该项显示不显示
      title: '分类管理', // 显示在左侧菜单栏的名称
      parent: '商城管理',
      sort: 1
    },
    redirect: '/categoryFirst', // 点击该链接跳转到的主页面
    children: [
      {
        path: '/categoryFirst',
        name: 'categoryFirst',
        component: () => import('@/views/category/firstCategory/index'),
        meta: {
          index: 3, // 等级3的路由代表该菜单项的一个子页面（如：商品分类管理的商品列表页面）
          title: '一级分类管理' // 进入该页面时，其显示在顶部导航栏里的标题
        }
      },
      {
        path: '/categorySecond',
        name: 'categorySecond',
        component: () => import('@/views/category/secondCategory/index'),
        meta: {
          index: 3,
          title: '二级分类管理'
        }
      },
      {
        path: '/categoryThird',
        name: 'categoryThird',
        component: () => import('@/views/category/thirdCategory/index'),
        meta: {
          index: 3,
          title: '三级分类管理'
        }
      },
      {
        path: '/categoryProducts',
        name: 'categoryProducts',
        component: () => import('@/views/category/products/index'),
        meta: {
          index: 3,
          title: '分类商品管理'
        }
      }
    ]
  }

]
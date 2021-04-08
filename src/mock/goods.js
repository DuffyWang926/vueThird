import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

let goodsTree = [
  // { id: '1', name: '健康食品', pid: '0' },
  // { id: '2', name: '健康食品子类1', pid: '1' },
  // { id: '3', name: '健康食品子类2', pid: '1' },
  // { id: '4', name: '健康食品子类1商品1', pid: '2' },
  // { id: '5', name: '健康食品子类1商品2', pid: '2' },
  // { id: '6', name: '健康食品子类2商品1', pid: '3' },
  // { id: '7', name: '宠物食品', pid: '0' },
  // { id: '8', name: '宠物食品子类1', pid: '7' },
  // { id: '9', name: '宠物食品子类1商品1', pid: '8' },
]

for (let i = 1; i <= 3; i++) {
  goodsTree.push(
    Mock.mock({
      id: i,
      name: '@cname',
      subId: '0'
    })
  )
}

for (let i = 4; i <= 12; i++) {
  goodsTree.push(
    Mock.mock({
      id: i,
      name: '@cname',
      'subId|1-3': 1
    })
  )
}

for (let i = 13; i <= 36; i++) {
  goodsTree.push(
    Mock.mock({
      id: i,
      name: '@cname',
      'subId|4-12': 1
    })
  )
}

for (let i = 37; i <= 100; i++) {
  goodsTree.push(
    Mock.mock({
      id: i,
      name: '@cname',
      'subId|12-36': 1
    })
  )
}
Mock.mock(RegExp('http://127.0.0.1:8079/backend/getproductbyid' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  return {
    status: 0,
    data: goodsTree.find(item => item.id == queryInfo.id)
  }
})

for (let i = 101; i < 200; i++) {
  const productItem = Mock.mock({
    categoryName: '@cname',
    'colour|1-100': 1,
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    extend1: '',
    id: i,
    'subId|37-100': 1,
    img: '@image',
    indexKey: 0,
    'isOnSale|1': [1, 2],
    'nowPrice|1-100': 138,
    'oldPrice|1-100': 0,
    'points|1-100': 0,
    productId: 315,
    productName: '@cname',
    'size|1-100': 1,
    skuCode: 'cs2021022601C',
    'state|1': 0,
    stock: 0,
    'type|1': [1, 2],
    warehouseName: '自营',
    'weight|1-100': 1
  })
  productItem.name = productItem.productName
  goodsTree.push(productItem)
}

// for (let i = 1; i <= 4; i++) {
//   goodsTree = goodsTree.filter(item => goodsTree.find(subItem => subItem.pid === item.id) || item.level === 4)
// }

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getproductitembyid' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  return {
    status: 0,
    data: goodsTree.find(item => item.id == queryInfo.id)
  }
})

// Mock.mock(RegExp('http://127.0.0.1:8079/getGoods?' + '.*'), options => {
//   const queryInfo = parseGetParams(options.url)
//   console.log(queryInfo)
//   console.log(options)
//   return {
//     status: 0,
//     data: {
//       goodsList: goodsList.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
//       count: restrictRegions.length
//     }
//   }
// })

Mock.mock('http://127.0.0.1:8079/backend/getAllCategory', options => {
  return {
    status: 0,
    data: goodsTree
  }
})

Mock.mock('http://127.0.0.1:8079/getAllGoodsList', options => {
  return {
    status: 0,
    data: {
      goodsList: [
        { id: '1', name: '啦啦啦' },
        { id: '2', name: '哈哈哈' },
        { id: '3', name: '糖果' },
        { id: '4', name: '药' },
        { id: '5', name: '泻药' }
      ]
    }
  }
})

const productList = []

for (let i = 1; i < 101; i++) {
  const product = Mock.mock({
    categoryName: '@cname',
    'colour|1-100': 1,
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
    extend1: '',
    id: i,
    img: '@image',
    indexKey: 0,
    'isOnSale|1': [1, 2],
    nowPrice: 138,
    oldPrice: 0,
    'points|1-100': 0,
    productId: 315,
    productName: '@cname',
    'size|1-100': 1,
    skuCode: 'cs2021022601C',
    'state|1': 0,
    stock: 0,
    'type|1': [1, 2],
    warehouseName: '自营',
    'weight|1-100': 1
  })
  productList.push(product)
}

Mock.mock(RegExp('http://127.0.0.1:8079/productItemList?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      productList: productList.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: productList.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteProduct?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/setProductIsOnSale?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: queryInfo.isOnSale === 1 ? '上架成功' : '下架成功'
    }
  }
})

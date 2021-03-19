import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

const goodsTree = [
  { id: '1', name: '健康食品', pid: '0' },
  { id: '2', name: '健康食品子类1', pid: '1' },
  { id: '3', name: '健康食品子类2', pid: '1' },
  { id: '4', name: '健康食品子类1商品1', pid: '2' },
  { id: '5', name: '健康食品子类1商品2', pid: '2' },
  { id: '6', name: '健康食品子类2商品1', pid: '3' },
  { id: '7', name: '宠物食品', pid: '0' },
  { id: '8', name: '宠物食品子类1', pid: '7' },
  { id: '9', name: '宠物食品子类1商品1', pid: '8' },
]

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

Mock.mock('http://127.0.0.1:8079/getAllGoodsTree', options => {
  return {
    status: 0,
    data: {
      goodsList: goodsTree,
      count: goodsTree.length
    }
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
        { id: '5', name: '泻药' },
      ]
    }
  }
})

const productList = []

for (let i = 1; i < 101; i++) {
  const product = Mock.mock({
    "categoryName": "@cname",
    "colour|1-100": 1,
    "createTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
    "extend1": "",
    "id": i,
    "img": "@image",
    "indexKey": 0,
    "isOnSale|1": [1, 2],
    "nowPrice": 138,
    "oldPrice": 0,
    "points": 0,
    "productId": 315,
    "productName": "@cname",
    "size|1-100": 1,
    "skuCode": "cs2021022601C",
    "state|1": 0,
    "stock": 0,
    "type|1": [1, 2],
    "warehouseName": "自营",
    "weight|1-100": 1
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





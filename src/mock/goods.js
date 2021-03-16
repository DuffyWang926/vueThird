const Mock = require('mockjs')

const goodsList = [
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

Mock.mock(RegExp('http://127.0.0.1:8079/getAllGoods'), options => {
  return {
    status: 0,
    data: {
      goodsList,
      count: goodsList.length
    }
  }
})
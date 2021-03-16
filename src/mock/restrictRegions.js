import parseGetParams from '@/utils/parseGetParams'
// import regions from './region'

const Mock = require('mockjs')

const restrictRegions = []

for (let i = 1; i <= 100; i++) {
  restrictRegions.push(Mock.mock({
    id: i,
    'goodsId|1-100': 100,
    goodsName: '@cname',
    'regionCode|100000-999999': 100,
    'regionName|1': ['河北省', '北京市', '广东省'],
    creator: '@cname',
    createTime: '@date("yyyy-MM-dd HH:mm:ss")'
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getRestrictRegions?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      restrictRegions: restrictRegions.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: restrictRegions.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteRestrictRegion?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  restrictRegions.splice(restrictRegions.findIndex(item => item.id === queryInfo.id), 1)
  console.log(restrictRegions);
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/addRestrictRegions'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '添加成功！'
    }
  }
})



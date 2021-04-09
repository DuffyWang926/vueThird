import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')
const Random = require('mockjs').Random;

const hotWordInfo = []

for (let i = 1; i <= 999; i++) {
  hotWordInfo.push(Mock.mock({
    id: i,
      'hotWordName|1': ['犬夜叉', '杀生丸', '戈薇', '七宝', '弥勒', '珊瑚'],//热搜词名称

  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getHotWord?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)//解析url中的信息
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      hotWordInfo: hotWordInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count:hotWordInfo.length
    }
  }
})

 Mock.mock(RegExp('http://127.0.0.1:8079/matchHotWord?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      matchHotWordInfo: hotWordInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: hotWordInfo.length
    }
  }
})

//post请求
 Mock.mock('http://127.0.0.1:8079/addHotName', options => {
  console.log(options)
  console.log(options.body)
 /* const queryInfo = JSON.parse(options.body)
  console.log(queryInfo) */
  return {
    status: 0
    }
  }
)

 Mock.mock('http://127.0.0.1:8079/editHotNameById', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
 /* const queryInfo = JSON.parse(options.body)
  console.log(queryInfo) */
  return {
    status: 0,
    data:hotWordInfo.find(item => item.id == queryInfo.id)
    }
  }
)

 Mock.mock('http://127.0.0.1:8079/editHotWord', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
 /* const queryInfo = JSON.parse(options.body)
  console.log(queryInfo) */
  return {
    status: 0,
    msg: '修改成功'
    }
  }
)

Mock.mock('http://127.0.0.1:8079/deleteHotWord', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
 /* const queryInfo = JSON.parse(options.body)
  console.log(queryInfo) */
  return {
    status: 0,
    msg: '删除成功'
    }
  })


/*Mock.mock(RegExp('http://127.0.0.1:8079/matchMemCard?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  // const matachMemInfo = membersInfo.filter(item => item.id == queryInfo.id)
  return {
    status: 0,
    data: {
      matchMemCardInfo: membersInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: membersInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/showMembersInfo?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      memberInfo: membersInfo.find(item => item.id == queryInfo.id)
    }
  }
})
 */

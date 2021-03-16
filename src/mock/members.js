import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')
const Random = require('mockjs').Random;

const membersInfo = []

for (let i = 1; i <= 999; i++) {
  membersInfo.push(Mock.mock({
    id: i,
    'membersId|1-1000': 0,
   /* membersImg: '@image', */
     membersImg: Random.image(50),
    'membersName|1': ['张三', '李四', '王五'],
    'membersIdCard|100000000000000000-999999999999999999':100,
    'membersCard|10000000000-99999999999':100,
    'membersBankNum|0000000000000000000000-9999999999999999999999':100,
    'membersStatus|1': ['正常', '注销'],
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getMembersInfo?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      membersInfo: membersInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: membersInfo.length
    }
  }
})

/* Mock.mock(RegExp('http://127.0.0.1:8079/showMembersInfo?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  membersInfo.splice(membersInfo.findIndex(item => item.id === queryInfo.id), 1)
  console.log(membersInfo);
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
}) */

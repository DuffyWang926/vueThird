import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

const roles = []

for (let i = 1; i <= 100; i++) {
  roles.push(Mock.mock({
    id: i,
    roleName: Mock.Random.cname()
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/roles' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  if (queryInfo.roleId) {
    return {
      status: 0,
      data: {
        roles: [roles.find(item => item.id === roleId)],
        count: 1
      }
    }
  } else {
    return {
      status: 0,
      data: {
        roles: roles.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
        count: roles.length
      }
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteRestrictRegionGroup' + '.*'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})
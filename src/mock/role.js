import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

const roles = []

for (let i = 1; i <= 100; i++) {
  roles.push(
    Mock.mock({
      id: i,
      roleName: Mock.Random.cname()
    })
  )
}

Mock.mock('http://127.0.0.1:8079/roles', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
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

Mock.mock('http://127.0.0.1:8079/getAllRoles', options => {
  return {
    status: 0,
    data: {
      roles
    }
  }
})

Mock.mock('http://127.0.0.1:8079/deleteRole', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '删除成功'
  }
})

Mock.mock('http://127.0.0.1:8079/addRole', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '添加成功'
  }
})

Mock.mock('http://127.0.0.1:8079/editRole', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '修改成功'
  }
})

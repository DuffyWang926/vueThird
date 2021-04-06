const Mock = require('mockjs')

const users = []

for (let i = 1; i <= 101; i++) {
  users.push(
    Mock.mock({
      id: i,
      username: '@first',
      roleName: '@cname',
      'roleId|2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      'status|1': ['正常', '删除'],
      name: '@cname',
      number: /1[1-9]{6}/,
      phone: /^1[3456789]\d{9}$/
    })
  )
}

Mock.mock('http://127.0.0.1:8079/backend/getAdminList', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo.page, queryInfo.page)
  return {
    status: 0,
    data: {
      users: users.slice((queryInfo.page - 1) * queryInfo.limit, queryInfo.page * queryInfo.limit),
      count: users.length
    }
  }
})

Mock.mock('http://127.0.0.1:8079/backend/deleteAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '删除成功！'
  }
})

Mock.mock('http://127.0.0.1:8079/backend/addAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '添加成功！'
  }
})

Mock.mock('http://127.0.0.1:8079/backend/editAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '修改成功！'
  }
})

Mock.mock('http://127.0.0.1:8079/backend/modifyPwd', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '修改成功！'
  }
})

Mock.mock('http://127.0.0.1:8079/backend/getAdminById', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: users.find(item => item.id == queryInfo.id)
  }
})

Mock.mock('http://127.0.0.1:8079/backend/modifySelfPwd', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    message: '修改成功！'
  }
})

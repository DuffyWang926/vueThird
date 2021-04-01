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

Mock.mock('http://127.0.0.1:8079/getUsers', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo.pagenum, queryInfo.pagesize)
  return {
    status: 0,
    data: {
      users: users.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: users.length
    }
  }
})

Mock.mock('http://127.0.0.1:8079/deleteAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: {
      message: '删除成功！'
    }
  }
})

Mock.mock('http://127.0.0.1:8079/addAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: {
      message: '添加成功！'
    }
  }
})

Mock.mock('http://127.0.0.1:8079/editAdmin', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: {
      message: '修改成功！'
    }
  }
})

Mock.mock('http://127.0.0.1:8079/editPassword', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: {
      message: '修改成功！'
    }
  }
})

Mock.mock('http://127.0.0.1:8079/getAdminById', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: users.find(item => item.id == queryInfo.id)
  }
})

Mock.mock('http://127.0.0.1:8079/editSelfPassword', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    data: {
      message: '修改成功！'
    }
  }
})

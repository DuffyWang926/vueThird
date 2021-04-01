const Mock = require('mockjs')

const menus = []

for (let i = 1; i <= 10; i++) {
  menus.push(
    Mock.mock({
      id: i,
      pid: 0,
      name: '@cname',
      type: 1,
      // url: '@url',
      'index|1-10': 1,
      'isShow|1': [true, false],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    })
  )
}

for (let i = 11; i <= 30; i++) {
  menus.push(
    Mock.mock({
      id: i,
      'pid|1-10': 1,
      name: '@cname',
      type: 2,
      url: '@url',
      'index|1-10': 1,
      'isShow|1': [true, false],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    })
  )
}

for (let i = 31; i <= 50; i++) {
  menus.push(
    Mock.mock({
      id: i,
      'pid|11-30': 1,
      name: '@cname',
      type: 3,
      // url: '@url',
      'index|1-10': 1,
      'isShow|1': [true, false],
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")'
    })
  )
}
1

Mock.mock('http://127.0.0.1:8079/getMenus', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo.pagenum, queryInfo.pagesize)
  return {
    status: 0,
    data: {
      menus: menus.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: menus.length
    }
  }
})

Mock.mock('http://127.0.0.1:8079/getMenuById', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0,
    data: menus.find(item => item.id == queryInfo.id)
  }
})

Mock.mock('http://127.0.0.1:8079/deleteMenu', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0,
    msg: '删除成功'
  }
})

Mock.mock('http://127.0.0.1:8079/changeIsShow', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

Mock.mock('http://127.0.0.1:8079/getAllCategories', options => {
  return {
    status: 0,
    data: menus
      .filter(item => item.type === 1)
      .map(item => {
        return { id: item.id, name: item.name }
      })
  }
})

Mock.mock('http://127.0.0.1:8079/getAllMenus', options => {
  return {
    status: 0,
    data: menus
      .filter(item => item.type === 2)
      .map(item => {
        return { id: item.id, name: item.name }
      })
  }
})

Mock.mock('http://127.0.0.1:8079/addMenu', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

Mock.mock('http://127.0.0.1:8079/editMenu', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

const Mock = require('mockjs')

Mock.mock('http://127.0.0.1:8079/backend/editAutoCancelTime', options => {
  console.log(options.body)
  return {
    status: 0,
    msg: '修改成功！'
  }
})

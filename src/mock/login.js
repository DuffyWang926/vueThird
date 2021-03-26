import rights from './rights'

const Mock = require('mockjs')
/* const loginUser = [
  {username: 'zhangxujia', password: '111' },
  {username: 'wangenfei', password: '222' },
  {username: 'zhaohanyu', password: '333' },
]
 */

Mock.mock('http://127.0.0.1:8079/login', options => {
  console.log(options.body)
  return {
    "is_succ": 1,
    "data": {
      "token": "Bearer alkjfdlksjflkasjdfklasjdflkajsdf",
      "username": 'zhaohanyu',
      "rights": rights
    }
  }
})

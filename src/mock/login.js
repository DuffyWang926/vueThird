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
      "rights": [{
          "checked": false,
          "id": 1,
          "name": "安全管理",
          "pid": 0,
          "level": 1
        },
        {
          "checked": true,
          "id": 2,
          "name": "权限管理",
          "pid": 1,
          "level": 2
        },
        {
          "checked": true,
          "id": 3,
          "name": "权限管理添加权限按钮",
          "pid": 2,
          "level": 3
        }
      ]
    },
  }
})

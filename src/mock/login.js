import rights from './rights'

const Mock = require('mockjs')

/*
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
 */
Mock.mock('http://127.0.0.1:8079/loginregis/oauth/token', options => {
  console.log(options.body)
  return {
    is_succ: 1,
    msg: '',
    data: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzb3VyY2UiXSwidXNlcl9uYW1lIjoie1wiaWRcIjoxNTM3MjE2M30iLCJzY29wZSI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIiwiUk9MRV9BUEkiXSwiZXhwIjoxNjE0MDY0NTg3LCJhdXRob3JpdGllcyI6WyJST0xFX0FQSSJdLCJqdGkiOiI1NDZkNTYwZC1iYTI4LTQ3OTgtOTVjMy1jMTA4ODYxMjlhOGEiLCJjbGllbnRfaWQiOiJjMSJ9.CL3vNBpYnjtw3khi5GIj_TszUbOTb1hoQpjRcWGdX0I',
      token_type: 'bearer',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzb3VyY2UiXSwidXNlcl9uYW1lIjoie1wiaWRcIjoxNTM3MjE2M30iLCJzY29wZSI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIiwiUk9MRV9BUEkiXSwiYXRpIjoiNTQ2ZDU2MGQtYmEyOC00Nzk4LTk1YzMtYzEwODg2MTI5YThhIiwiZXhwIjoxNjE0MzE2NTg3LCJhdXRob3JpdGllcyI6WyJST0xFX0FQSSJdLCJqdGkiOiJkNGU3NjIwZS1hYWUxLTRjN2EtYjA1ZC1lZmNmN2M4Y2ExNmIiLCJjbGllbnRfaWQiOiJjMSJ9.6OatheVEFD3_eHJuEu0AIDAZ-hY2mQCUrkgE9e4LHdQ',
      expires_in: 7199,
      scope: 'ROLE_ADMIN ROLE_USER ROLE_API',
      jti: '546d560d-ba28-4798-95c3-c10886129a8a'
    }
  }
})

Mock.mock('http://127.0.0.1:8079/backend/getMenuList', options => {
  console.log(options.body)
  return {
    is_succ: 1,
    msg: '',
    data: {
      username: 'zhaohanyu',
      rights: rights
    }
  }
})

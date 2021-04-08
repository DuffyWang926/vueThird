import parseGetParams from '@/utils/parseGetParams'
const Mock = require('mockjs')

const qualifications = []

for (let i = 1; i <= 101; i++) {
  qualifications.push(
    Mock.mock({
      id: i,
      title: '@cname',
      image: '@image',
      content: '@csentence'
    })
  )
}

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getQualificationById' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  return {
    status: 0,
    data: qualifications.find(item => item.id == queryInfo.id)
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getQualifications' + '?.*'), options => {
  console.log(options.body)
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo.page, queryInfo.limit)
  return {
    status: 0,
    data: {
      qualifications: qualifications.slice((queryInfo.page - 1) * queryInfo.limit, queryInfo.page * queryInfo.limit),
      count: qualifications.length
    }
  }
})

Mock.mock('http://127.0.0.1:8079/backend/addQualification', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

Mock.mock('http://127.0.0.1:8079/backend/editQualification', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

Mock.mock('http://127.0.0.1:8079/backend/deleteQualification', options => {
  console.log(options.body)
  const queryInfo = JSON.parse(options.body)
  return {
    status: 0
  }
})

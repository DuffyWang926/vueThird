import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

const warehouses = []

for (let i = 1; i <= 10; i++) {
  warehouses.push(Mock.mock({
    id: i,
    name: '@cname'
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getAllWarehouses'), options => {
  return {
    status: 0,
    data: {
      warehouses: warehouses
    }
  }
})

const taxes = []

for (let i = 1; i <= 10; i++) {
  taxes.push(Mock.mock({
    id: i,
    name: '@cname'
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getAllTaxes'), options => {
  return {
    status: 0,
    data: {
      taxes: taxes
    }
  }
})
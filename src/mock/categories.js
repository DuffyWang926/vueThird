import parseGetParams from '@/utils/parseGetParams'
// import regions from './region'

const Mock = require('mockjs')

const goodsIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const firstCategories = []

for (let i = 1; i <= 11; i++) {
  firstCategories.push(Mock.mock({
    id: i,
    categoryName: '@cname',
    'backgroundImage': 'https://image.huashangjk.com/121/2/17/1615944928908y5wqjRmxzA.jpeg',
    'level|1-100': 1,
    'type|1': [1, 2, 3],
    'imageType|1': [1, 2, 3],
    'goodsId|1-5': 1,
    'goodsIds': ['5', '6']
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getFirstCategories?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      firstCategories: firstCategories.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: firstCategories.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/getFirstCategoryById?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      category: firstCategories.find(item => item.id == queryInfo.id)
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/addFirstCategory'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '添加成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/editFirstCategoryById'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '修改成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteFirstCategory?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})

const secondCategories = []

for (let i = 12; i <= 50; i++) {
  secondCategories.push(Mock.mock({
    id: i,
    'firstCategoryId|1-11': 1,
    categoryName: '@cname',
    'level|1-100': 1,
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getSecondCategories?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  const matchedSecondCategories = secondCategories.filter(secondItem => secondItem.firstCategoryId == queryInfo.firstCategoryId)
  return {
    status: 0,
    data: {
      secondCategories: matchedSecondCategories.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: matchedSecondCategories.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/getSecondCategoryById?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      category: secondCategories.find(item => item.id == queryInfo.id)
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/addSecondCategory'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '添加成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/editSecondCategoryById'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '修改成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteSecondCategory?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})

const thirdCategories = []

for (let i = 51; i <= 200; i++) {
  thirdCategories.push(Mock.mock({
    id: i,
    'secondCategoryId|12-50': 1,
    categoryName: '@cname',
    'level|1-100': 1,
  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getThirdCategories?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  const matchedThirdCategories = thirdCategories.filter(thirdItem => thirdItem.secondCategoryId == queryInfo.secondCategoryId)
  return {
    status: 0,
    data: {
      thirdCategories: matchedThirdCategories.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: matchedThirdCategories.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/getThirdCategoryById?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      category: thirdCategories.find(item => item.id == queryInfo.id)
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/addThirdCategory'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '添加成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/editThirdCategoryById'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '修改成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/deleteThirdCategory?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/getAllCategoryTree'), options => {
  return {
    status: 0,
    data: {
      categoryList: [
        ...(firstCategories.map(item => {
          return {
            id: item.id,
            pid: 0,
            name: item.categoryName
          }
        })),
        ...(secondCategories.map(item => {
          return {
            id: item.id,
            pid: item.firstCategoryId,
            name: item.categoryName
          }
        })),
        ...(thirdCategories.map(item => {
          return {
            id: item.id,
            pid: item.secondCategoryId,
            name: item.categoryName
          }
        }))
      ]
    }
  }
})

const productList = []

for (let i = 1; i < 500; i++) {
  const product = Mock.mock({
    id: i,
    "name": "@cname",
    "thirdCategoryId|51-200": 1,
    "level|1-10": 1
  })
  productList.push(product)
}

Mock.mock(RegExp('http://127.0.0.1:8079/getProductByThirdCategoryId?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  const matchedProducts = productList.filter(product => product.thirdCategoryId == queryInfo.thirdCategoryId)
  return {
    status: 0,
    data: {
      products: matchedProducts.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: matchedProducts.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/addProductsToThirdCategory'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '添加成功'
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/editProductLevel'), options => {
  console.log(options.body);
  return {
    status: 0,
    data: {
      message: '修改成功'
    }
  }
})


Mock.mock(RegExp('http://127.0.0.1:8079/deleteProductFromThirdCategory?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      message: '删除成功'
    }
  }
})


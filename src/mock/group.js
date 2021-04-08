import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')
const Random = require('mockjs').Random

const groupsInfo = []

for (let i = 1; i <= 100; i++) {
  groupsInfo.push(
    Mock.mock({
      id: i,
      'name|1': ['中秋大促', '年中折扣', '双十一'], //活动名称
      'state|1': [0, 1, 2, 3], //团购活动状态
      'productName|1': ['松花粉买五送一', '大麻叶洗护9.9', '烟酰胺精华买五送一'], //活动商品
      'price|1-3': '$', //团购价
      'point|111-999': 2, //拼购积分
      date: '@date("yyyy-MM-dd")', //活动时间
      'openNumber|0-99999': 100, //开团数量
      'groupNumber|0-99999': 100 //成团数量
    })
  )
}

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getgroupbuylist?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      groupBuyListVos: groupsInfo.slice((queryInfo.page - 1) * queryInfo.limit, queryInfo.page * queryInfo.limit),
      total: groupsInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getgroupNumber?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      openNumber: 1,
      groupNumber: 2
    }
  }
})

const groupInfo = []

for (let i = 1; i <= 1000; i++) {
  groupInfo.push(
    Mock.mock({
      id: i,
      'pid|1-100': 1,
      'productName|1': ['松花粉买五送一', '大麻叶洗护9.9', '烟酰胺精华买五送一'], //活动商品
      time: '@date("yyyy-MM-dd")', //开团时间
      'state|1': ['拼团成功', '拼团失败', '成团中'], //拼团状态
      'userName|1': ['王一博', '肖战', '布拉德皮特', '马里奥', '马特达蒙'], //开团人姓名
      'memberNum|0000000000-9999999999999': 100, //开团人卡号
      'number|1-10': 0, //自购数量
      'newNumber|0-99': 100, //参团新人数
      'totalNumber|0-99': 100 //参团总人数
    })
  )
} 
//post请求

/* Mock.mock('http://127.0.0.1:8079/appedgrouplist', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  console.log(options)
  const matchedgetGroupInfo = groupInfo.filter(item => item.groupGoodId == queryInfo.groupGoodId)
  return {
    status: 0,
    data: {
      matchedgetGroupInfo: matchedgetGroupInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: matchedgetGroupInfo.length
    }
  }
}) */

Mock.mock(RegExp('http://127.0.0.1:8079/backend/getgroupbuyname'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: groupsInfo.map(item => {
      return {
        id: item.id,
        name: item.name
      }
    })
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/backend/appedgrouplist?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  const matchedgetGroupInfo = groupInfo.filter(item => item.pid == queryInfo.id)
  return {
    status: 0,
    data: {
      groupBuySponsorLists: matchedgetGroupInfo.slice((queryInfo.page - 1) * queryInfo.limit, queryInfo.page * queryInfo.limit),
      total: matchedgetGroupInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/backend/updatestate' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  return {
    is_succ: 1,
    msg: '',
    data: []
  }
})

Mock.mock('http://127.0.0.1:8079/backend/addgroupbuy', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    msg: '',
    data: {}
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/backend/groupbuydetail' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo.id)
  return {
    is_succ: 1,
    msg: '',
    data: {
      groupBuy: {
        id: 1,
        name: '测试团购',
        startDate: '2021-03-22T16:20:55.000+00:00',
        endDate: '2021-03-22T16:21:01.000+00:00',
        groupDesc: '活动规则概述',
        beginDesc: '开团描述',
        joinDesc: '参与描述',
        shareDesc: '分享文字',
        leaderRequire: 1,
        groupMinNum: 3,
        expiryDate: 1,
        newMemberMin: 10,
        status: 1
      },
      groupBuyProduct: [
        {
          id: 1,
          groupBuyId: 1,
          productName: '苏芙水盈滋养面膜',
          productSku: '6973011680032',
          productId: 87,
          productItemId: 110,
          productSalePrice: 50.0,
          productSalePoint: 50,
          createTime: '2021-03-22T16:32:08.000+00:00',
          productNum: 5,
          buyType: 1
        }
      ],
      groupBuyLevel: [
        {
          id: 1,
          groupBuyId: 1,
          memberLevel: 1,
          type: 0,
          rebateMoney: 100.0,
          createTime: '2021-03-22T16:28:09.000+00:00'
        }
      ]
    }
  }
})

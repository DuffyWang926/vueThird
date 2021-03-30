import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')

Mock.mock('http://127.0.0.1:8079/addgroupbuy', options => {
  const queryInfo = JSON.parse(options.body)
  console.log(queryInfo)
  return {
    status: 0,
    msg: '',
    data: {}
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/groupbuydetail' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo.id)
  return {
    is_succ: 1,
    msg: '',
    data: {
      groupBuyEntity: {
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
      groupBuyProductEntity: [
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
      groupBuyLevelEntities: [
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

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

Mock.mock(RegExp('http://127.0.0.1:8079/getgroupbuylist?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      groupsInfo: groupsInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: groupsInfo.length
    }
  }
})

const groupInfo = []

for (let i = 1; i <= 1000; i++) {
  groupInfo.push(
    Mock.mock({
      id: i,
      'id|1-100': 1,
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

Mock.mock('http://127.0.0.1:8079/appedgrouplist', options => {
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
})

Mock.mock(RegExp('http://127.0.0.1:8079/updatestate' + '?.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  return {
    is_succ: 1,
    msg: '',
    data: []
  }
})

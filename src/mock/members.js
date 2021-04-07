import parseGetParams from '@/utils/parseGetParams'

const Mock = require('mockjs')
const Random = require('mockjs').Random;

const membersInfo = []

for (let i = 1; i <= 999; i++) {
  membersInfo.push(Mock.mock({
    id: i,
     /* membersImg: '@image', */
       membersImg: Random.image(50),//头像
      'membersNickName|1': ['喜羊羊', '懒羊羊', '小灰灰'],//昵称
      'membersTel|13500000000-13599999999':100,//手机号
      'membersLeval|1': ['1级', '2级', '3级', '4级', '5级'],//会员等级
      'membersStatus|1': ['正常', '注销'],//会员状态
      'membersFrom|1': ['新会员', '老会员'],//会员来源
      'registTime' : '@date("yyyy-MM-dd")',//注册时间
      'firstEnter' : '@date("yyyy-MM-dd") @time("a HH:mm:ss")',//首次登录时间
      'firstIP' : '@ip',//首次登录IP
      'firstProv': '@province',//首次登录省份
      'membersId|1-1000': 0,//编号
      'gender|1' : ['女', '男'],//性别
      'birthday': '@date("yyyy-MM-dd")',//出生日期
      'identify|1': ['已认证', '未认证'],//是否认证
      'membersName|1': ['王一博', '肖战', '布拉德皮特', '马里奥', '马特达蒙'],//真实姓名
      'membersIdCard|100000000000000000-999999999999999999':100,//身份证号
      'showTel|1': ['隐藏', '展示'],//是否展示手机号
      'wechatNum|1-10': "★",//微信号
      'wechatNickname|1': ['王一博女朋友', '肖战绯闻女友'],//微信昵称
       wechatImg: Random.image(50),//微信头像
       'membersCard|10000000000-99999999999':100,
       'lastMoney|1-5': '￥',//会员钱包余额
       'cashOutFreeze|1-3': '$',//提现冻结金额
       'willPaid|3': '*',//待发放金额
       'offsetMoney|3': '*',//抵用金余额
       'goldCoin|3': '*',//金币
       'points|111-999': 2,//积分
        'cardUse|1': ['提现卡', '消费卡'],//用途
        'bankNum|0000000000-9999999999999':100,//银行卡号
        'bankName|1': ['中国建设银行', '中国工商银行', '中国人民银行'],//银行名称
        'bankShortName|1': ['ICBC', 'ICCC', 'IZZZ'],//银行简称
        'cardType|1': ['储蓄卡', '信用卡'],//银行卡类型
        'cardHolderName|1': ['卡主人1号', '卡主人2号', '卡主人3号'],//持卡人姓名
        'cardHolderDoc|1': ['护照', '身份证', '户口本'],//持卡人证件类型
        'cardHolderDocNum|100000000000000000-999999999999999999':100,//持卡人证件号码
        'cardHolderTel|18500000000-18599999999':100,//持卡人手机号码
        'createTime' : '@date("yyyy-MM-dd") @time("a HH:mm:ss")',//创建时间
        'dataStatus|1': ['正常', '异常'],//数据状态
        'wechatOrElse|1': ['是','否'],//是否绑定微信登录
        'membersType|1': ['A', 'B', 'C', 'D', 'E', 'F'],//会员类型
        'blackOuts|1': ['正常', '已拉黑'],//拉黑状态
        'cashStatus|1': ['可提现', '已提现', '不可提现'],//提现状态

  }))
}

Mock.mock(RegExp('http://127.0.0.1:8079/getMembersInfo?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)//解析url中的信息
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      membersInfo: membersInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: membersInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/matchMemList?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  // const matachMemInfo = membersInfo.filter(item => item.id == queryInfo.id)
  return {
    status: 0,
    data: {
      matachMemInfo: membersInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: membersInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/matchMemCard?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  // const matachMemInfo = membersInfo.filter(item => item.id == queryInfo.id)
  return {
    status: 0,
    data: {
      matchMemCardInfo: membersInfo.slice((queryInfo.pagenum - 1) * queryInfo.pagesize, queryInfo.pagenum * queryInfo.pagesize),
      count: membersInfo.length
    }
  }
})

Mock.mock(RegExp('http://127.0.0.1:8079/showMembersInfo?' + '.*'), options => {
  const queryInfo = parseGetParams(options.url)
  console.log(queryInfo)
  console.log(options)
  return {
    status: 0,
    data: {
      memberInfo: membersInfo.find(item => item.id == queryInfo.id)
    }
  }
})

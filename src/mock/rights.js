const rights = JSON.parse('[{"checked":false,"icon":"glyphicon glyphicon-cog","id":1,"menuUrl":"","name":"系统配置","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":2,"menuUrl":"","name":"安全管理","pid":0},{"checked":false,"icon":"glyphicon glyphicon-user","id":4,"menuUrl":"","name":"会员管理","pid":0},{"checked":true,"icon":"glyphicon glyphicon-shopping-cart","id":5,"menuUrl":"","name":"商城管理","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":6,"menuUrl":"","name":"订单管理","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":7,"menuUrl":"","name":"营销管理","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":9,"menuUrl":"","name":"报表","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":10,"menuUrl":"","name":"客服","pid":0},{"checked":false,"id":13,"menuUrl":"","name":"系统参数设置","pid":1},{"checked":false,"icon":"","id":14,"menuUrl":"","name":"用户协议编辑","pid":1},{"checked":false,"icon":"","id":15,"menuUrl":"","name":"用户隐私编辑","pid":1},{"checked":false,"icon":"","id":16,"menuUrl":"","name":"发票须知编辑","pid":1},{"checked":false,"icon":"","id":17,"menuUrl":"","name":"资质管理","pid":1},{"checked":false,"id":18,"menuUrl":"","name":"热搜词管理","pid":1},{"checked":true,"icon":"","id":21,"menuUrl":"","name":"权限管理","pid":2},{"checked":true,"icon":"","id":22,"menuUrl":"","name":"账户管理","pid":2},{"checked":false,"icon":"","id":41,"menuUrl":"","name":"会员列表","pid":4},{"checked":false,"icon":"","id":42,"menuUrl":"","name":"会员绑卡信息","pid":4},{"checked":false,"icon":"","id":43,"menuUrl":"","name":"会员认证记录","pid":4},{"checked":false,"icon":"","id":44,"menuUrl":"","name":"注销管理","pid":4},{"checked":false,"icon":"","id":46,"menuUrl":"","name":"会员信息互换","pid":4},{"checked":true,"icon":"","id":51,"menuUrl":"","name":"分类管理","pid":5},{"checked":true,"icon":"","id":52,"menuUrl":"","name":"商品管理","pid":5},{"checked":true,"id":53,"menuUrl":"","name":"限售区域管理","pid":5},{"checked":false,"id":61,"menuUrl":"","name":"订单列表","pid":6},{"checked":false,"icon":"","id":62,"menuUrl":"","name":"备货订单","pid":6},{"checked":false,"icon":"","id":63,"menuUrl":"","name":"待发货订单","pid":6},{"checked":false,"id":64,"menuUrl":"","name":"售后管理","pid":6},{"checked":false,"id":65,"menuUrl":"","name":"评价管理","pid":6},{"checked":false,"id":66,"menuUrl":"","name":"发票管理","pid":6},{"checked":false,"id":67,"menuUrl":"","name":"逆退单管理","pid":6},{"checked":false,"id":68,"menuUrl":"","name":"逆退订单明细","pid":6},{"checked":false,"id":71,"menuUrl":"","name":"优惠券管理","pid":7},{"checked":false,"icon":"","id":72,"menuUrl":"","name":"优惠券推送管理","pid":7},{"checked":false,"id":82,"menuUrl":"","name":"站内信管理","pid":1},{"checked":false,"id":83,"menuUrl":"","name":"资金流水","pid":9},{"checked":false,"id":84,"menuUrl":"","name":"提现管理","pid":9},{"checked":false,"icon":"","id":1000,"menuUrl":"","name":"仓库与运费","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":1001,"menuUrl":"","name":"首页配置","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":1002,"menuUrl":"","name":"返利管理","pid":0},{"checked":false,"icon":"glyphicon glyphicon-cog","id":1003,"menuUrl":"","name":"日志管理","pid":0},{"checked":false,"icon":"","id":10001,"menuUrl":"","name":"仓库管理","pid":1000},{"checked":false,"icon":"","id":10002,"menuUrl":"","name":"运费模版管理","pid":1000},{"checked":false,"id":10011,"menuUrl":"","name":"轮播图管理","pid":1001},{"checked":false,"icon":"","id":10012,"menuUrl":"","name":"专题活动管理","pid":1001},{"checked":false,"icon":"","id":10013,"menuUrl":"","name":"楼层管理","pid":1001},{"checked":false,"id":10021,"menuUrl":"","name":"订单返利","pid":1002},{"checked":false,"id":10022,"menuUrl":"","name":"月度返利","pid":1002},{"checked":false,"id":10031,"menuUrl":"","name":"用户日志","pid":1003},{"checked":false,"id":10032,"menuUrl":"","name":"积分日志","pid":1003},{"checked":false,"id":10033,"menuUrl":"","name":"订单日志","pid":1003},{"checked":false,"icon":"","id":10034,"menuUrl":"","name":"管理员操作日志","pid":1003},{"checked":false,"icon":"","id":10035,"menuUrl":"","name":"优惠券日志","pid":1003},{"checked":false,"id":10036,"menuUrl":"","name":"订单列表","pid":10},{"checked":false,"id":10037,"menuUrl":"","name":"售后列表","pid":10},{"checked":false,"id":10038,"menuUrl":"","name":"发票列表","pid":10},{"checked":false,"id":10039,"menuUrl":"","name":"会员列表(查看)","pid":10},{"checked":false,"id":10040,"menuUrl":"","name":"会员列表(操作)","pid":10},{"checked":false,"id":10041,"menuUrl":"","name":"返利金待发放管理","pid":1002},{"checked":false,"id":10042,"menuUrl":"","name":"月度统计审核管理","pid":1002},{"checked":false,"id":10046,"menuUrl":"","name":"售后协议编辑","pid":1},{"checked":false,"id":10047,"menuUrl":"","name":"企业介绍编辑","pid":1},{"checked":false,"id":10048,"menuUrl":"","name":"关于我们编辑","pid":1},{"checked":false,"id":10049,"menuUrl":"","name":"提现说明编辑","pid":1},{"checked":false,"id":10050,"menuUrl":"","name":"促销活动","pid":7},{"checked":false,"id":10051,"menuUrl":"","name":"发送短信日志","pid":1003},{"checked":false,"id":10055,"menuUrl":"","name":"返利发放规则","pid":1},{"checked":false,"id":10057,"menuUrl":"","name":"优惠券发放","pid":7},{"checked":false,"id":10058,"menuUrl":"","name":"培训课程管理","pid":7},{"checked":false,"id":10059,"menuUrl":"","name":"培训课程轮播图管理","pid":7},{"checked":false,"id":10060,"menuUrl":"","name":"培训课程分类管理","pid":7},{"checked":false,"id":10061,"menuUrl":"","name":"单件优惠","pid":7},{"checked":false,"id":10062,"menuUrl":"","name":"分类管理","pid":1001},{"checked":false,"id":10063,"menuUrl":"","name":"图片配置","pid":7},{"checked":false,"id":10064,"menuUrl":"","name":"抵用金管理","pid":4},{"checked":true,"id":0,"name":"全部"}]')

export default rights
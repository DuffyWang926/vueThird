const Mock = require('mockjs')

Mock.mock('http://127.0.0.1:8079/backend/editAutoCancelTime', options => {
  console.log(options.body)
  return {
    status: 0,
    msg: '修改成功！'
  }
})

Mock.mock('http://127.0.0.1:8079/backend/parameter/getAllParameters', options => {
  return {
    is_succ: 1,
    msg: '',
    data: {
      orderParametersMap: {
        auto_close_order_time: '1',
        auto_received_day: '365',
        ADMIN_CANCEL_ORDER_TIME: '30',
        USER_CANCEL_ORDER_TIME: '30',
        apply_after_sale_day: '30',
        minpay: '0.01',
        self_get_overtime: '3'
      },
      invoiceParametersMap: {
        FHR: '赵玺斌',
        FAPIAO_APPLAY_TIME: '30',
        SKR: '邬大微'
      },
      repertoryParametersMap: {
        stock_number: '0'
      },
      cashParametersMap: {
        cash_charge: '3',
        min_cash_money: '1.01'
      },
      otherParametersMap: {
        shareProductLogo: '',
        shareProductTitle: ''
      },
      posterParametersMap: null,
      couponParametersMap: {
        share_the_title: '快来领取好友送您的优惠券',
        shareCouponTitle: '荐康客橙意购来啦',
        shareCouponLogo: '120/6/10/1594311544641IDcTt7dxnj.jpg'
      }
    }
  }
})

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>订单参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">自动取消时间</span>
            <span class="value">{{ data.autoCancelTime }}时</span>
            <el-button type="primary" size="medium" @click="autoCancelTimeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">自动收货时间</span>
            <span class="value">{{ data.autoReceiveTime }}天</span>
            <el-button type="primary" size="medium" @click="autoReceiveTimeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">可售后时段</span>
            <span class="value">{{ data.canAfterSaleTime }}天</span>
            <el-button type="primary" size="medium" @click="canAfterSaleTimeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">最小订单支付金额</span>
            <span class="value">{{ data.minPayment }}元</span>
            <el-button type="primary" size="medium" @click="minPaymentClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">用户可取消订单时间</span>
            <span class="value">{{ data.canCancelOrderTime }}分</span>
            <el-button type="primary" size="medium" @click="canCancelOrderTimeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">管理员可取消订单时间<br />（推送ERP时间）</span>
            <span class="value">{{ data.canAdminCancelOrderTime }}分</span>
            <el-button type="primary" size="medium" @click="canAdminCancelOrderTimeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">自提订单超时未提取自动取消订单时间</span>
            <span class="value">{{ data.selfPickupTimeoutAutoCancelTime }}天</span>
            <el-button type="primary" size="medium" @click="selfPickupTimeoutAutoCancelTimeClicked">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>提现参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">手续费费率设置</span>
            <span class="value">{{ data.handlingFeeRate }}%</span>
            <el-button type="primary" size="medium" @click="handlingFeeRateClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">提现最低金额</span>
            <span class="value">{{ data.withdrawMin }}元</span>
            <el-button type="primary" size="medium" @click="withdrawMinClicked">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>商品海报设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">标题设置</span>
            <el-button type="primary" size="medium" @click="titleClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">LOGO设置</span>
            <el-button type="primary" size="medium" @click="logoClicked">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>分享劵设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">分享微信标题设置</span>
            <el-button type="primary" size="medium" @click="shareWechatTitleClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">分享微信logo设置</span>
            <el-button type="primary" size="medium" @click="shareWechatLogoClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">小程序分享券列表标题设置</span>
            <el-button type="primary" size="medium" @click="miniProgramTitleClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">分享券发放范围-白名单</span>
            <div class="switch-wrap">
              <el-switch
                :model-value="data.shareCouponWhiteList"
                @click="handleSwitch('backend/editAutoCancelTime', !data.shareCouponWhiteList, 'value', '确定启用白名单限制吗', '确定关闭白名单限制吗？')"
              ></el-switch>
            </div>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>发票参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">发票收款人</span>
            <span class="value">{{ data.invoicePayee }}</span>
            <el-button type="primary" size="medium" @click="invoicePayeeClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票复核人</span>
            <span class="value">{{ data.invoiceReviewer }}</span>
            <el-button type="primary" size="medium" @click="invoiceReviewerClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票可申请时间</span>
            <span class="value">{{ data.invoiceApplyTime }}天</span>
            <el-button type="primary" size="medium" @click="invoiceApplyTimeClicked">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>库存提醒设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">提示"库存紧张"数量</span>
            <span class="value">{{ data.stockTightPrompt }}件</span>
            <el-button type="primary" size="medium" @click="stockTightPromptClicked">设置</el-button>
          </li>
        </ul>
      </el-card>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>其他参数设置</span>
          </div>
        </template>
        <ul class="list">
          <li class="list-item">
            <span class="title">敏感词参数</span>
            <el-button type="primary" size="medium" @click="sensitiveWordsClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">优秀社群达标标准</span>
            <span class="value">{{ data.excellentCommunityStandard }}积分</span>
            <el-button type="primary" size="medium" @click="excellentCommunityStandardClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">优秀社群达标差额提示标准</span>
            <span class="value">{{ data.excellentCommunityPromptStandard }}积分</span>
            <el-button type="primary" size="medium" @click="excellentCommunityPromptStandardClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">基础绩效达标标准</span>
            <span class="value">{{ data.basicPerformanceStandard }}积分</span>
            <el-button type="primary" size="medium" @click="basicPerformanceStandardClicked">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">微信支付是否已经开通</span>
            <div class="switch-wrap">
              <el-switch
                :model-value="data.wechatPayEnabled"
                @click="handleSwitch('backend/editAutoCancelTime', !data.wechatPayEnabled, 'value', '确定启用微信支付吗', '确定关闭微信支付吗？')"
              ></el-switch>
            </div>
          </li>
          <li class="list-item">
            <span class="title">支付宝支付是否已经开通</span>
            <div class="switch-wrap">
              <el-switch
                :model-value="data.alipayEnabled"
                @click="handleSwitch('backend/editAutoCancelTime', !data.alipayEnabled, 'value', '确定启用支付宝支付吗', '确定关闭支付宝支付吗？')"
              ></el-switch>
            </div>
          </li>
          <li class="list-item">
            <span class="title">清除首页缓存</span>
            <el-button type="primary" size="medium" @click="handleClear('backend/editAutoCancelTime', '您确定清除首页缓存吗？')">清除</el-button>
          </li>
          <li class="list-item">
            <span class="title">清除分类页面缓存</span>
            <el-button type="primary" size="medium" @click="handleClear('backend/editAutoCancelTime', '您确认清除分类页面缓存吗?')">清除</el-button>
          </li>
          <li class="list-item">
            <span class="title">清除推荐产品缓存</span>
            <el-button type="primary" size="medium" @click="handleClear('backend/editAutoCancelTime', '您确认清除推荐产品缓存吗?')">清除</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-dialog v-model="editDialogVisible" width="500px" @close="handleClose" destroy-on-close>
      <template #title>{{ editDialogSettings.title }}</template>
      <el-form :model="editForm" ref="editFormRef" label-position="top" class="edit-form">
        <el-form-item :label="editDialogSettings.label" prop="value" :rules="editDialogSettings.rules">
          <el-input v-model="editForm.value" @blur="parse" v-if="!editDialogSettings.textarea"></el-input>
          <el-input type="textarea" v-model="editForm.value" v-if="editDialogSettings.textarea" resize="none" rows="3"></el-input>
          <span class="suffix">{{ editDialogSettings.suffix }}</span>
        </el-form-item>
        <el-row class="tip">{{ editDialogSettings.tip || '' }}</el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="logoDialogVisible" width="500px" @close="handleLogoClose" destroy-on-close>
      <template #title>修改LOGO</template>
      <el-form :model="logoForm" ref="logoFormRef" label-position="top" class="edit-form">
        <el-form-item
          label="设置LOGO"
          prop="value"
          :rules="[
            { required: true, message: 'LOGO不能为空！', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value.length !== 1) {
                  console.log('LOGO不能为空！')
                  callback(new Error('请选择LOGO！'))
                } else {
                  callback()
                }
              },
              trigger: ['blur, change']
            }
          ]"
        >
          <my-upload v-model:image-list="logoForm.value">
            <div style="font-size: 16px; color: red">注：图片上传不得超过10M。</div>
          </my-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="logoDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditLogo">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-row>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import service from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  setup() {
    const data = reactive({
      // 订单参数设置
      autoCancelTime: 1,
      autoReceiveTime: 30,
      canAfterSaleTime: 30,
      minPayment: 0.01,
      canCancelOrderTime: 30,
      canAdminCancelOrderTime: 30,
      selfPickupTimeoutAutoCancelTime: 3,
      // 提现参数设置
      handlingFeeRate: 4,
      withdrawMin: 0.01,
      // 商品海报设置
      title: '',
      logo: 'https://image.huashangjk.com/121/2/17/1615950359740zRYkUyOu8d.jpg',
      // 分享券设置
      shareWechatTitle: '',
      shareWechatLogo: 'https://image.huashangjk.com/120/6/10/1594311544641IDcTt7dxnj.jpg',
      miniProgramTitle: '',
      shareCouponWhiteList: true,
      // 发票参数设置
      invoicePayee: '屋大维',
      invoiceReviewer: '赵玺斌',
      invoiceApplyTime: 30,
      // 库存提醒设置
      stockTightPrompt: 1,
      // 其他参数设置
      sensitiveWords: 'a,b,c',
      excellentCommunityStandard: 50000,
      excellentCommunityPromptStandard: 1,
      basicPerformanceStandard: 3300,
      wechatPayEnabled: true,
      alipayEnabled: true
    })
    const editDialogVisible = ref(false)
    const editDialogSettings = reactive({
      title: '参数修改',
      label: '',
      prop: '',
      // value: '',
      suffix: '',
      url: '',
      rules: [],
      tip: '',
      confirmText: '',
      integer: false,
      float: false,
      textarea: false
    })
    const editForm = reactive({
      value: ''
    })
    const editFormRef = ref(null)
    const handleClose = () => {
      editDialogSettings.title = '参数修改'
      editDialogSettings.label = ''
      editDialogSettings.prop = ''
      editDialogSettings.suffix = ''
      editDialogSettings.url = ''
      editDialogSettings.rules = []
      editDialogSettings.tip = ''
      editDialogSettings.integer = false
      editDialogSettings.float = false
      editDialogSettings.textarea = false
      editForm.value = ''
    }
    const btns = reactive({
      autoCancelTimeClicked: () => {
        // editDialogSettings.title = '修改自动取消时间'
        editDialogSettings.label = '自动取消时间设置'
        editDialogSettings.suffix = '小时'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '自动取消时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('自动取消时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改自动取消时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.autoCancelTime
      },
      autoReceiveTimeClicked: () => {
        editDialogSettings.label = '自动收货时间设置'
        editDialogSettings.suffix = '天'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '自动收货时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('自动收货时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改自动收货时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.autoReceiveTime
      },
      canAfterSaleTimeClicked: () => {
        editDialogSettings.label = '可售后时段'
        editDialogSettings.suffix = '天'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '可售后时段不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('可售后时段必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改可申请售后时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.canAfterSaleTime
      },
      minPaymentClicked: () => {
        editDialogSettings.label = '订单最低金额支付'
        editDialogSettings.suffix = '元'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '最小订单支付金额不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^([0-9]*|\d*\.\d{1}?\d*)$/.test(value + '') || value <= 0) {
                callback(new Error('最小订单支付金额必须为正数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改订单最低金额支付吗？'
        editDialogSettings.float = true
        editDialogVisible.value = true
        editForm.value = data.minPayment
      },
      canCancelOrderTimeClicked: () => {
        editDialogSettings.label = '用户可取消订单时间设置'
        editDialogSettings.suffix = '分钟'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '用户可取消订单时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('用户可取消订单时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定设置用户可取消订单时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.canCancelOrderTime
      },
      canAdminCancelOrderTimeClicked: () => {
        editDialogSettings.label = '管理员可取消订单时间（推送ERP时间）'
        editDialogSettings.suffix = '分钟'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '推送ERP时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('推送ERP时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定设置管理员可取消订单时间（推送ERP时间）？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.canAdminCancelOrderTime
      },
      selfPickupTimeoutAutoCancelTimeClicked: () => {
        editDialogSettings.label = '自提订单超时未提取自动取消订单时间设置'
        editDialogSettings.suffix = '天'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '超时未提取自动取消订单时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('超时未提取自动取消订单时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定设置自提订单超时未提取自动取消订单时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.selfPickupTimeoutAutoCancelTime
      },
      handlingFeeRateClicked: () => {
        editDialogSettings.label = '手续费设置'
        editDialogSettings.suffix = '%'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '手续费费率不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^([0-9]*|\d*\.\d{1}?\d*)$/.test(value + '') || value <= 0) {
                callback(new Error('手续费费率必须为正数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改手续费费率吗？'
        editDialogSettings.float = true
        editDialogVisible.value = true
        editForm.value = data.handlingFeeRate
      },
      withdrawMinClicked: () => {
        editDialogSettings.label = '最低提现金额设置'
        editDialogSettings.suffix = '元'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '最低提现金额不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^([0-9]*|\d*\.\d{1}?\d*)$/.test(value + '') || value <= 0) {
                callback(new Error('最低提现金额必须为正数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改提现最低金额吗？'
        editDialogSettings.float = true
        editDialogVisible.value = true
        editForm.value = data.withdrawMin
      },
      titleClicked: () => {
        editDialogSettings.label = '分享标题设置'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [{ required: true, message: '分享标题不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改产品分享标题设置？'
        editDialogVisible.value = true
        editDialogSettings.textarea = true
        editForm.value = data.title
      },
      logoClicked: () => {
        logoForm.value = [data.logo]
        logoForm.url = 'backend/editAutoCancelTime'
        logoForm.prop = 'value'
        logoForm.confirmText = '确定修改产品分享LOGO设置？'
        logoDialogVisible.value = true
      },
      shareWechatTitleClicked: () => {
        editDialogSettings.label = '微信分享券标题设置'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [{ required: true, message: '微信分享券标题不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改分享券标题设置？'
        editDialogVisible.value = true
        editDialogSettings.textarea = true
        editForm.value = data.shareWechatTitle
      },
      shareWechatLogoClicked: () => {
        logoForm.value = [data.shareWechatLogo]
        logoForm.url = 'backend/editAutoCancelTime'
        logoForm.prop = 'value'
        logoForm.confirmText = '确定修改分享券LOGO设置？'
        logoDialogVisible.value = true
      },
      miniProgramTitleClicked: () => {
        editDialogSettings.label = '小程序分享券列表标题设置'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [{ required: true, message: '小程序分享券列表标题不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改小程序分享券列表标题设置设置？'
        editDialogVisible.value = true
        editDialogSettings.textarea = true
        editForm.value = data.miniProgramTitle
      },
      invoicePayeeClicked: () => {
        editDialogSettings.label = '发票收款人设置'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [{ required: true, message: '发票收款人不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改发票收款人？'
        editDialogVisible.value = true
        editForm.value = data.invoicePayee
      },
      invoiceReviewerClicked: () => {
        editDialogSettings.label = '发票复核人设置'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [{ required: true, message: '发票复核人不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改发票复核人？'
        editDialogVisible.value = true
        editForm.value = data.invoiceReviewer
      },
      invoiceApplyTimeClicked: () => {
        editDialogSettings.label = '发票可申请时间'
        editDialogSettings.suffix = '天'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '发票可申请时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('发票可申请时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改发票可申请时间？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.invoiceApplyTime
      },
      stockTightPromptClicked: () => {
        editDialogSettings.label = '库存紧张提醒数量'
        editDialogSettings.suffix = '件'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '库存紧张提醒数量不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('库存紧张提醒数量必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改提醒库存紧张数量？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.stockTightPrompt
      },
      sensitiveWordsClicked: () => {
        editDialogSettings.label = '敏感词汇'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.prop = 'value'
        editDialogSettings.rules = [{ required: true, message: '敏感词汇不能为空！', trigger: 'blur' }]
        editDialogSettings.confirmText = '确定修改敏感词？'
        editDialogVisible.value = true
        editDialogSettings.textarea = true
        editDialogSettings.tip = '敏感词汇设置需使用英文逗号隔开'
        editForm.value = data.sensitiveWords
      },
      excellentCommunityStandardClicked: () => {
        editDialogSettings.label = '优秀社群达标标准'
        editDialogSettings.suffix = '积分'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '优秀社群达标标准不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('优秀社群达标标准必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改优秀社群达标标准？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.excellentCommunityStandard
      },
      excellentCommunityPromptStandardClicked: () => {
        editDialogSettings.label = '优秀社群达标差额提示标准'
        editDialogSettings.suffix = '积分'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '优秀社群达标差额提示标准不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('优秀社群达标差额提示标准必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改优秀社群达标差额提示标准？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.excellentCommunityPromptStandard
      },
      basicPerformanceStandardClicked: () => {
        editDialogSettings.label = '基础绩效达标标准'
        editDialogSettings.suffix = '积分'
        editDialogSettings.prop = 'value'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '基础绩效达标标准不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '') || value <= 0) {
                callback(new Error('基础绩效达标标准必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.confirmText = '确定修改基础绩效达标标准？'
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.basicPerformanceStandard
      }
    })
    const parse = () => {
      if (editDialogSettings.integer) {
        if (!isNaN(parseInt(editForm.value))) {
          editForm.value = parseInt(editForm.value)
        }
      } else if (editDialogSettings.float) {
        if (!isNaN(parseFloat(editForm.value))) {
          editForm.value = parseFloat(editForm.value)
        }
      }
    }
    const getInfo = async () => {}
    const handleEdit = () => {
      editFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm(editDialogSettings.confirmText, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const res = await service.post(editDialogSettings.url, {
                [editDialogSettings.prop]: editForm.value
              })
              if (res.status == 0) {
                ElMessage.success('修改成功！')
                await getInfo()
                editDialogVisible.value = false
              }
            })
            .catch((e) => {
              ElMessage({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          ElMessage.error('修改失败！请检查标红项！')
        }
      })
    }
    const handleSwitch = (url, value, prop, openText, closeText) => {
      ElMessageBox.confirm(value ? openText : closeText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await service.post(url, {
            [prop]: value
          })
          if (res.status == 0) {
            ElMessage.success('操作成功！')
            await getInfo()
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    const handleClear = (url, text) => {
      ElMessageBox.confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await service.post(url)
          if (res.status == 0) {
            ElMessage.success('清除成功！')
            await getInfo()
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    const logoDialogVisible = ref(false)
    const logoForm = {
      value: [],
      url: 'backend/editAutoCancelTime',
      prop: '',
      confirmText: ''
    }
    const logoFormRef = ref(null)
    const handleLogoClose = () => {
      logoForm.value = []
      logoForm.url = ''
      logoForm.prop = ''
      logoForm.confirmText = ''
    }
    const handleEditLogo = () => {
      logoFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm(logoForm.confirmText, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const res = await service.post(logoForm.url, {
                [logoForm.prop]: logoForm.value[0]
              })
              if (res.status == 0) {
                ElMessage.success('修改成功！')
              }
              logoDialogVisible.value = false
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          ElMessage.error('修改失败！请检查是否上传了图片！')
        }
      })
    }
    return {
      data,
      editDialogVisible,
      editDialogSettings,
      editForm,
      editFormRef,
      handleClose,
      ...toRefs(btns),
      parse,
      handleEdit,
      handleSwitch,
      handleClear,
      logoDialogVisible,
      logoForm,
      logoFormRef,
      handleLogoClose,
      handleEditLogo
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-card {
  margin-bottom: 20px;
}
.list {
  .list-item {
    display: flex;
    // height: 55px;
    border-bottom: 1px solid #ddd;
    flex-direction: row;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    min-height: 52px;
    color: #666;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
      min-height: 36px;
    }
    .title {
      flex: 1;
      padding-right: 20px;
    }
    .value {
      width: 80px;
    }
    .el-button {
      // width: 50px;
      margin: 0 10px;
    }
    .switch-wrap {
      width: 70px;
      margin: 0 10px;
      text-align: center;
    }
  }
}

.suffix {
  flex: 1;
  padding-left: 15px;
}

.tip {
  color: red;
  font-size: 16px;
}

.el-input {
  width: 80%;
}

.el-textarea {
  width: 100%;
}

.edit-form {
  margin-top: -20px;
  margin-bottom: -15px;
  .el-form-item {
    /deep/.el-form-item__content {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
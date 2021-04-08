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
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">可售后时段</span>
            <span class="value">{{ data.canAfterSaleTime }}天</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">最小订单支付金额</span>
            <span class="value">{{ data.minPayment }}元</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">用户可取消订单时间</span>
            <span class="value">{{ data.canCancelOrderTime }}分</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">管理员可取消订单时间<br />（推送ERP时间）</span>
            <span class="value">{{ data.canAdminCancelOrderTime }}分</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">自提订单超时未提取自动取消订单时间</span>
            <span class="value">{{ data.selfPickupTimeoutAutoCancelTime }}天</span>
            <el-button type="primary" size="medium">设置</el-button>
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
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">提现最低金额</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
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
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">LOGO设置</span>
            <el-button type="primary" size="medium">设置</el-button>
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
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">分享微信logo设置</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">小程序分享券列表标题设置</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">分享券发放范围-白名单</span>
            <div class="switch-wrap">
              <el-switch></el-switch>
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
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票复核人</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">发票可申请时间</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
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
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
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
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">优秀社群达标标准</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">优秀社群达标差额提示标准</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">基础绩效达标标准</span>
            <span class="value">1时</span>
            <el-button type="primary" size="medium">设置</el-button>
          </li>
          <li class="list-item">
            <span class="title">微信支付是否已经开通</span>
            <div class="switch-wrap">
              <el-switch></el-switch>
            </div>
          </li>
          <li class="list-item">
            <span class="title">支付宝支付是否已经开通</span>
            <div class="switch-wrap">
              <el-switch></el-switch>
            </div>
          </li>
          <li class="list-item">
            <span class="title">清除首页缓存</span>
            <el-button type="primary" size="medium">清除</el-button>
          </li>
          <li class="list-item">
            <span class="title">清除分类页面缓存</span>
            <el-button type="primary" size="medium">清除</el-button>
          </li>
          <li class="list-item">
            <span class="title">清除推荐产品缓存</span>
            <el-button type="primary" size="medium">清除</el-button>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-dialog v-model="editDialogVisible" width="500px" @close="handleClose" destroy-on-close>
      <template #title>{{ editDialogSettings.title }}</template>
      <el-form :model="editForm" ref="editFormRef" label-position="top" class="edit-form">
        <el-form-item :label="editDialogSettings.label" prop="value" :rules="editDialogSettings.rules">
          <el-input v-model="editForm.value" @blur="parse"></el-input>
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
  </el-row>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import service from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  setup() {
    const data = reactive({
      autoCancelTime: 1,
      autoReceiveTime: 30,
      canAfterSaleTime: 30,
      minPayment: 0.01,
      canCancelOrderTime: 30,
      canAdminCancelOrderTime: 30,
      selfPickupTimeoutAutoCancelTime: 3
    })
    const editDialogVisible = ref(false)
    const editDialogSettings = reactive({
      title: '参数修改',
      label: '',
      // value: '',
      suffix: '',
      url: '',
      rules: [],
      tip: '',
      integer: false,
      float: false
    })
    const editForm = reactive({
      value: ''
    })
    const editFormRef = ref(null)
    const handleClose = () => {
      editDialogSettings.title = '参数修改'
      editDialogSettings.label = ''
      editDialogSettings.suffix = ''
      editDialogSettings.url = ''
      editDialogSettings.rules = []
      editDialogSettings.tip = ''
      editDialogSettings.integer = false
      editDialogSettings.float = false
      editForm.value = ''
    }
    const btns = reactive({
      autoCancelTimeClicked: () => {
        // editDialogSettings.title = '修改自动取消时间'
        editDialogSettings.label = '自动取消时间设置'
        editDialogSettings.suffix = '小时'
        editDialogSettings.url = 'backend/editAutoCancelTime'
        editDialogSettings.rules = [
          { required: true, message: '自动取消时间不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!/^[1-9]\d*$/.test(value + '')) {
                callback(new Error('自动取消时间必须为正整数！'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
        editDialogSettings.integer = true
        editDialogVisible.value = true
        editForm.value = data.autoCancelTime
      }
    })
    const parse = () => {
      if (editDialogSettings.integer) {
        editForm.value = parseInt(editForm.value)
      } else if (editDialogSettings.float) {
        editForm.value = parseFloat(editForm.value)
      }
    }
    const handleEdit = () => {
      editFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm('确定修改吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const res = await service.post(editDialogSettings.url, {
                value: editForm.value
              })
              if (res.status == 0) {
                ElMessage.success('修改成功！')
              }
              editDialogVisible.value = false
            })
            .catch(() => {
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
    return {
      data,
      editDialogVisible,
      editDialogSettings,
      editForm,
      editFormRef,
      handleClose,
      ...toRefs(btns),
      parse,
      handleEdit
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
    color: #666;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
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
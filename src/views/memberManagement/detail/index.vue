<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>基本信息</span>
        <el-button class="button" type="text" @click="$router.push({ path: '/memberWithCard' })">返回</el-button>
        </div>
    </template>
    <el-form :inline="true" :model="formInline">
      <el-form-item v-for="item in detailList" :key="item.id" :label="item.title" :prop="item.prop" :width="item.width || ''">
        <el-input :model-value="info[item.prop]"></el-input>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>钱包信息</span>
        </div>
    </template>
    <el-form :inline="true" :model="formInline">
      <el-form-item v-for="item in walletList" :key="item.id" :label="item.title" :prop="item.prop" :width="item.width || ''">
        <el-input :model-value="info[item.prop]"></el-input>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>备注信息</span>
        </div>
    </template>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">{{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 备注</el-button>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>银行卡信息</span>
        </div>
    </template>
     <my-table :columns="columns"  :data="[info]"  :operationShow = 'false' preview-show @preview="">
     </my-table>
  </el-card>

</template>

<script>
 import { ref, reactive, nextTick} from 'vue'
 import { useRouter, useRoute } from 'vue-router'
 import service from '@/utils/request'
 export default {
   name: "detail",
   setup() {
     const info = ref({
      membersImg: '',
      membersId: '',
      membersTel: '',
      membersStatus: '',
      membersName: '',
      membersCard: '',
      membersIdCard: '',
      membersBankNum: '',
    })
     const getMemberInfo = async() => {
       const {data: res} = await service.get('showMembersInfo', {
         params: {
           id: useRoute().params.id
         }
       })
       info.value = res.memberInfo
     }
    getMemberInfo()
    const $router = useRouter()
    const queryInfo = reactive({
      membersImg: '',
      membersId: '',
      membersTel: '',
      membersStatus: '',
      membersName: '',
      membersCard: '',
      membersIdCard: '',
      membersBankNum: '',
    })
    const detailList = [
      {
        title: '头像',
        prop: 'membersImg'
      },
      {
        title: '昵称',
        prop: 'membersNickName'
      },
      {
        title: '手机号',
        prop: 'membersTel'
      },
      {
        title: '会员等级',
        prop: 'membersLeval'
      },
      {
        title: '会员状态',
        prop: 'membersStatus'
      },
      {
        title: '来源',
        prop: 'membersFrom'
      },
      {
        title: '注册时间',
        prop: 'registTime'
      },
      {
        title: '首次登录时间',
        prop: 'firstEnter'
      },
      {
        title: '首次登录IP',
        prop: 'firstIP'
      },
      {
        title: '首次登录省份',
        prop: 'firstProv'
      },
      {
        title: '编号',
        prop: 'membersId'
      },
      {
         title: '性别',
         prop: 'gender'
      },
      {
        title: '出生日期',
        prop: 'birthday'
      },
      {
        title: '是否认证',
        prop: 'identify'
      },
      {
        title: '真实姓名',
        prop: 'membersName'
      },
      {
        title: '身份证号',
        prop: 'membersIdCard'
      },
      {
        title: '是否展示手机号',
        prop: 'showTel'
      },
      {
        title: '微信号',
        prop: 'wechatNum'
      },
      {
        title: '微信昵称',
        prop: 'wechatNickname'
      },
      {
        title: '微信头像',
        prop: 'wechatImg'
      },
      ]
    const walletList = [
      {
        title: '会员钱包余额',
        prop: 'lastMoney'
      },
      {
        title: '提现冻结金额',
        prop: 'cashOutFreeze'
      },
      {
        title: '待发放金额',
        prop: 'willPaid'
      },
      {
        title: '抵用金余额',
        prop: 'offsetMoney'
      },
      {
        title: '金币',
        prop: 'goldCoin'
      },
      {
        title: '积分',
        prop: 'points'
      },
    ]
    const columns = [
      {
        title: '用途',
        prop: 'cardUse'
      },
      {
        title: '银行卡号',
        prop: 'bankNum'
      },
      {
        title: '银行名称',
        prop: 'bankName'
      },
      {
        title: '银行简称',
        prop: 'bankShortName'
      },
      {
        title: '银行卡类型',
        prop: 'cardType'
      },
      {
        title: '持卡人姓名',
        prop: 'cardHolderName'
      },
      {
        title: '持卡人证件类型',
        prop: 'cardHolderDoc'
      },
      {
        title: '持卡人证件号码',
        prop: 'cardHolderDocNum'
      },
      {
        title: '持卡人手机号码',
        prop: 'cardHolderTel'
      },
      {
        title: '创建时间',
        prop: 'createTime'
      },
      {
        title: '数据状态',
        prop: 'dataStatus'
      },
    ]

    const dynamicTags = ref(['高级VIP', '寄几人', '八百里加急'])
    const inputValue = ref('')
    const inputVisible = ref(false)
    const saveTagInput = ref(null)
    const showInput = async (val) => {
        inputVisible.value = true
        await nextTick()
        saveTagInput.value.$refs.input.focus();
    }
   const handleClose = (tag) => {
            dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
          }

    const handleInputConfirm = (e) => {//这时候的输入是时间，不能再用val，应采用target
          if (inputValue.value) {
            dynamicTags.value.push(inputValue.value);
          }
         inputVisible.value = false;
         inputValue.value = '';
    }
    return {
     detailList,
     queryInfo,
     info,
     walletList,
     columns,
     dynamicTags,
     inputValue,
     inputVisible,
     showInput,
     saveTagInput,
     handleInputConfirm,
     handleClose
    }

   }
 }
</script>

<style scoped="scoped">
  .box-card {
    margin-bottom: 20px;
  }
  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color:#4e73df;
      font-weight: bold;
  }
  .el-button {
    color: black;
    background: #FFFFFF;
    padding: 8px 12px;
    border:1px solid #cccccc;
  }
   .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      width: 30px;
      height: 20px;
      border: 1px solid #cccccc;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
     }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>

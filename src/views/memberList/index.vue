<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">会员列表</div>
    </template>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="手机号" >
        <el-input size="medium" placeholder="请输入手机号" v-model="queryInfo.membersTel"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input size="medium" placeholder="请输入姓名" v-model="queryInfo.membersName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input size="medium" placeholder="请输入身份证号" v-model="queryInfo.membersIdCard"></el-input>
      </el-form-item>
      <el-form-item label="会员卡号">
        <el-input size="medium" placeholder="请输入会员卡号" v-model="queryInfo.membersCard"></el-input>
      </el-form-item>
      <el-form-item label="推荐人">
        <el-input size="medium" placeholder="请输入推荐人会员卡号" v-model="queryInfo.membersBankNum"></el-input>
      </el-form-item>
      <el-form-item label="来源" >
        <el-select v-model="memberMessage.region" placeholder="全部">
              <el-option value="全部"></el-option>
              <el-option value="新会员"></el-option>
              <el-option value="老会员(积分注册)"></el-option>
              <el-option value="老会员直销"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员等级">
          <el-select v-model="memberMessage.rank" placeholder="全部">
                  <el-option value="全部"></el-option>
                  <el-option value="零级会员"></el-option>
                  <el-option value="一级会员"></el-option>
                  <el-option value="二级会员"></el-option>
                  <el-option value="三级会员"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="注册时间">
          <el-date-picker
              v-model="memberMessage.value1"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
          >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="首登时间">
        <el-date-picker
            v-model="memberMessage.value2"
            type="daterange"
            align="center"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="积分">
        <el-input-number v-model="memberMessage.num1" controls-position="right" @change="handleNumChange" range-separator="-"></el-input-number>
        <span>&nbsp;-&nbsp;</span>
        <el-input-number v-model="memberMessage.num2" controls-position="right" @change="handleNumChange"></el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="memberMessage.status" placeholder="全部">
                <el-option value="全部"></el-option>
                <el-option value="正常"></el-option>
                <el-option value="注销"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="success" @click="getMembersInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <my-table
        :data="membersInfo"
        :columns="columns"
        :operation-width="480"
        preview-show
        preiviewText = "详情"
        @preview="detailChange"
        class="btn-group"
     >
        <template v-slot:userbtns="scope" >
          <el-button plain size="mini" type="warning" @click="handleChangeTel">手机号</el-button>
          <el-button plain size="mini" type="warning">身份证号</el-button>
          <el-button plain size="mini" type="warning">是否可提现</el-button>
          <el-button plain size="mini" type="warning">备注</el-button>
          <el-button size="mini" type="danger">拉黑</el-button>
        </template>
     </my-table>
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        background
        ></el-pagination>
  </el-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore} from 'vuex'
import service from '@/utils/request'
export default {
  name: "memberManagement",
  setup() {
    const $router = useRouter()
    const queryInfo = reactive({
      membersTel: '',
      membersName: '',
      membersCard: '',
      membersIdCard: '',
      membersBankNum: '',
      pagenum: 1,
      pagesize: 10
    })
    const memberMessage = reactive({
      region: '',
      rank: '',
      date1: '',
      date2: '',
      num1: '',
      num2: '',
      status: ''
    })
    const handleNumChange = (val) => {
      console.log(val)
    }
    const shortcuts = ref([{
        text: '本月',
        value: [new Date(), new Date()],
      }, {
        text: '今年至今',
        value: (() => {
          const end = new Date()
          const start = new Date(new Date().getFullYear(), 0)
          return [start, end]
        })(),
      }, {
        text: '最近六个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setMonth(start.getMonth() - 6)
          return [start, end]
        })(),
      }])



    const membersInfo = ref([])
    const getMembersInfo = async () => {
      try {
        const { data: res } = await service.get('getMembersInfo', {
          params: queryInfo
        })
        console.log(res)
        membersInfo.value = res.membersInfo
        count.value = res.count
      } catch (err) {
        console.log(err)
      }
    }
    getMembersInfo()
    const columns = [
      {
        title: '编号',
        prop: 'membersId'//prop仅是自定义的属性名称，与子父组件通信的props没有关系
      },
      {
        title: '头像',
        prop: 'membersImg',
        image:true
      },
      {
        title: '手机号',
        prop: 'membersTel'
      },
      {
        title: '姓名',
        prop: 'membersName'
      },
      {
        title: '身份证号',
        prop: 'membersIdCard'
      },
      {
        title: '会员卡号',
        prop: 'membersCard'
      },
      {
        title: '推荐人会员卡号',
        prop: 'membersCard'
      },/* mock缺 */
      {
        title: '来源',
        prop: 'membersOrign'
      },
      {
        title: '会员等级',
        prop: 'membersRank'
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
        title: '积分',
        prop: 'num'
      },
      {
        title: '微信号',
        prop: 'wechatNum'
      },
      {
        title: '微信头像',
        prop: 'wechatImg'
      },
      {
        title: '微信昵称',
        prop: 'wechatNum'
      },
      {
        title: '是否绑定微信登录',
        prop: 'wechatOrElse'
      },
      {
        title: '是否展示手机号',
        prop: 'showTel'
      },
      {
        title: '会员类型',
        prop: 'membersType'
      },
      {
        title: '会员状态',
        prop: 'membersStatus'
      },
      {
        title: '拉黑状态',
        prop: 'blackOuts'
      },
      {
        title: '提现状态',
        prop: 'cashStatus'
      },
    ]
    const count = ref(0)
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getMembersInfo()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getMembersInfo()
    }
    const currentPage = ref(1)
    const detailChange = (id) => {
       let path = '/detail/' + id//动态路由跳转的路径声明方式
       $router.push({path})
   }
   
   const store = useStore()
   console.log(store.getters['user/getRightById'](2));

 /*  const handleChangeTel = (id) => {
      membersInfo.membersCard(id) =
   } */
    return {
      queryInfo,
      membersInfo,
      columns,
      count,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      memberMessage,
      shortcuts,
      handleNumChange,
      detailChange,
      //handleChangeTel
    }
  }
};
</script>

<style scoped lang="scss">
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#4e73df;
        font-weight: bold;
    }
    .demo-form-inline {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#858796;
        border-bottom: 1px solid #e3e6f0;
    }
    .el-input {
      justify-content:space-between;
      vertical-align: right;
    }
    .el-pagination{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin:20px 0;
    }
</style>

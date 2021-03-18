<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">会员绑卡信息</div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="手机号" >
        <el-input size="medium" placeholder="请输入手机号" v-model="queryInfo.membersTel"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input size="medium" placeholder="请输入姓名" v-model="queryInfo.membersName"></el-input>
      </el-form-item>
      <el-form-item label="会员卡号">
        <el-input size="medium" placeholder="请输入会员卡号" v-model="queryInfo.membersCard"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input size="medium" placeholder="请输入身份证号" v-model="queryInfo.membersIdCard"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input size="medium" placeholder="请输入银行卡号" v-model="queryInfo.membersBankNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="success" @click="getMembersInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <my-table
        :data="membersInfo"
        :columns="columns"
        :operation-width="200"
        preview-show
        @preview="(id) => {$router.push({ path: '/detail/' + id })}"
        preiviewText = "详情"
      ></my-table>
    <el-pagination
          @size-change= "handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          background
          >
    </el-pagination>
  </el-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
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
        prop: 'membersId'
      },
      {
        title: '头像',
        prop: 'membersImg'
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
        title: '银行卡号',
        prop: 'membersBankNum'
      },
      {
        title: '会员状态',
        prop: 'membersStatus'
      }
    ]
    const count = ref(0)
   /* const showDetail = async (id) => {
      console.log(id)
      const res = await service.get('showMembersInfo', {
        params: { id }
      })
      console.log(res)
      if (res.status === 0) {
        getMembersInfo()
      }
    } */
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
    return {
      queryInfo,
      membersInfo,
      columns,
      count,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      $router
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
    .el-pagination{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin:20px 0;
    }
   /* .detail_entray{
      background-color: #409EFF;
      padding: 8px 12px;
      color: white;
      border-radius: 4px;
    } */
</style>

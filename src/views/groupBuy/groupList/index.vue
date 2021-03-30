<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">数据列表</div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="拼团活动" >
        <el-input size="medium" placeholder="单行输入" v-model="queryInfo.activityName"></el-input>
      </el-form-item>
      <el-form-item label="拼团时间">
          <el-date-picker
              v-model="queryInfo.activityTime"
              type="daterange"
              align="center"
              unlink-panels
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
          >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="拼团状态">
        <el-input size="medium" placeholder="单行输入" v-model="queryInfo.groupStatus"></el-input>
      </el-form-item>
      <el-form-item label="开团人卡号">
        <el-input size="medium" placeholder="单行输入" v-model="queryInfo.openerCard"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="success" @click="getGroupInfo">查询</el-button>
      </el-form-item>
    </el-form>
    <my-table
        :data="groupInfo"
        :columns="columns"
        :operationShow = false
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
import { useRouter, useRoute } from 'vue-router'
import service from '@/utils/request'
export default {
  name: "groupBuyManage",
  setup() {
    const $router = useRouter()
    const route = useRoute()//route是异步操作，需要将定义提前，不能写一句里，否则会出现报错
    const queryInfo = reactive({
      groupGoodId: route.query.groupGoodId,
      name: '',
      activityTime: '',
      groupStatus: '',
      memberNum: '',
      pagenum: 1,
      pagesize: 10
    })
    const groupInfo = ref([])
    const getGroupInfo = async () => {
        queryInfo.startDate = queryInfo.activityTime[0]
        queryInfo.endDate = queryInfo.activityTime[1]
        queryInfo.page = queryInfo.pagenum
        const { data: res } = await service.post('getGroupInfo', queryInfo)
        groupInfo.value = res.matchedgetGroupInfo
        count.value = res.count
        console.log(groupInfo.value);
      }
    getGroupInfo()

    const columns = [
      {
        title: '开团人姓名/昵称',
        prop: 'userName'
      },
      {
        title: '开团人卡号',
        prop: 'memberNum'
      },
      {
        title: '拼团商品',
        prop: 'productName'
      },
      {
        title: '自购数量',
        prop: 'number'
      },
      {
        title: '开团时间',
        prop: 'time'
      },
      {
        title: '拼团状态',
        prop: 'state'
      },
      {
        title: '参团新人数',
        prop: 'newNumber'
      },
      {
        title: '参团总人数',
        prop: 'totalNumber'
      }
    ]
    const count = ref(0)
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getGroupInfo()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getGroupInfo()
    }
   /* const groupList = (id) => {
        let path = '/groupList/' + id//动态路由跳转的路径声明方式
        $router.push({path})
    } */
    const currentPage = ref(1)
    return {
      queryInfo,
      groupInfo,
      columns,
      count,
      handleSizeChange,
      handleCurrentChange,
      currentPage
    }
  }
};
</script>

<style scoped>
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
</style>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">数据列表</div>
    </template>
    <el-form :model="formInline" class="demo-form-inline" label-position="left" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="拼团活动">
            <!-- <el-input size="medium" placeholder="单行输入" v-model="queryInfo.activityName"></el-input> -->
            <el-select v-model="queryInfo.id" placeholder="拼团活动" size="medium" filterable>
              <el-option v-for="item in groupBuyList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="拼团时间">
            <!-- <el-date-picker
                          v-model="queryInfo.activityTime"
                          type="daterange"
                          align="center"
                          unlink-panels
                          range-separator="——"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          size="medium"
                          style="width: 100%"
                        >
                        </el-date-picker> -->
            <el-date-picker
              v-model="queryInfo.activityTime"
              type="daterange"
              align="center"
              unlink-panels
              style="width: 100%"
              size="medium"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="拼团状态">
            <!-- <el-input size="medium" placeholder="单行输入" v-model="queryInfo.groupStatus"></el-input> -->
            <el-select v-model="queryInfo.groupStatus" placeholder="拼团状态" size="medium">
              <el-option value="" label="全部"></el-option>
              <el-option :value="0" label="未确认"></el-option>
              <el-option :value="1" label="进行中"></el-option>
              <el-option :value="2" label="已成团"></el-option>
              <el-option :value="3" label="拼团失败"></el-option>
              <el-option :value="4" label="已取消"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="开团人卡号">
            <el-input size="medium" placeholder="单行输入" v-model="queryInfo.memberNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="0">
            <el-button size="medium" type="success" @click="handleSubmit" v-show="store.getters['user/getRightById'](29)">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <my-table :data="groupInfo" :columns="columns" :operationShow="false"></my-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { ref, reactive, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import service from '@/utils/request'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
export default {
  name: 'GroupList',
  setup() {
    const $router = useRouter()
    const route = useRoute() //route是异步操作，需要将定义提前，不能写一句里，否则会出现报错
    const queryInfo = reactive({
      // id: route.params.id,
      id: route.params.id,
      name: '',
      activityTime: [],
      groupStatus: '',
      memberNum: '',
      pagenum: 1,
      pagesize: 10
    })
    const groupBuyList = ref([])
    const getAllGroupBuy = async () => {
      const { data: res } = await service.get('backend/getgroupbuyname')
      groupBuyList.value = res
      await nextTick()
      // debugger
      // console.log(queryInfo)
      if (route.params.id) {
        queryInfo.id = parseInt(route.params.id)
      } else {
        queryInfo.id = groupBuyList.value[0].id
      }
      appedgrouplist()
      // console.log(queryInfo)
      // if (queryInfo.id) {
      //   appedgrouplist()
      // }
    }
    getAllGroupBuy()
    const shortcuts = reactive([
      {
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })()
      },
      {
        text: '最近一个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        })()
      },
      {
        text: '最近三个月',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        })()
      }
    ])
    const groupInfo = ref([])
    const appedgrouplist = async () => {
      // queryInfo.startDate = queryInfo.activityTime[0]
      // queryInfo.endDate = queryInfo.activityTime[1]
      // queryInfo.page = queryInfo.pagenum
      // queryInfo.limit = queryInfo.pagesize
      // debugger
      if (!queryInfo.id) return //解决拼团列表当没有拼团活动id时点击查询的弹出
      const queryInfoCopy = {}
      queryInfoCopy.id = queryInfo.id
      queryInfoCopy.name = queryInfo.name
      queryInfoCopy.groupStatus = queryInfo.groupStatus
      queryInfoCopy.page = queryInfo.pagenum
      queryInfoCopy.limit = queryInfo.pagesize
      queryInfoCopy.memberNum = queryInfo.memberNum
      if (queryInfo.activityTime && queryInfo.activityTime.length == 2) {
        // queryInfoCopy.startDate = formatStartTime(queryInfo.activityTime[0]) || ''
        // queryInfoCopy.endDate = formatEndTime(queryInfo.activityTime[1]) || ''
        queryInfoCopy.startDate = dayjs(queryInfo.activityTime[0]).format('YYYY-MM-DD') || ''
        queryInfoCopy.endDate = dayjs(queryInfo.activityTime[1]).format('YYYY-MM-DD') || ''
      } else {
        queryInfoCopy.startDate = ''
        queryInfoCopy.endDate = ''
      }
      console.log(queryInfo)
      console.log(queryInfoCopy)
      const { data: res } = await service.get('backend/appedgrouplist', {
        params: queryInfoCopy
      })
      console.log(res)
      groupInfo.value = res.groupBuySponsorLists
      count.value = res.total
      groupInfo.value.forEach((item) => {
        switch (item.state) {
          case 4:
            item.stateStr = '已取消'
            break
          case 0:
            item.stateStr = '未确认'
            break
          case 3:
            item.stateStr = '拼团失败'
            break
          case 1:
            item.stateStr = '进行中'
            break
          case 2:
            item.stateStr = '已成团'
        }
      })
      // count.value = res.count
      console.log(groupInfo.value)
    }
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      if (queryInfo.id) {
        appedgrouplist()
      } else {
        ElMessage.error('请至少选择一个拼团活动。')
      }
    }
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
        prop: 'stateStr'
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
      appedgrouplist()
    }
    const handleCurrentChange = (val) => {
      // debugger
      queryInfo.pagenum = val
      appedgrouplist()
    }
    const currentPage = ref(1)
    const store = useStore()
    return {
      queryInfo,
      groupBuyList,
      groupInfo,
      columns,
      count,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      appedgrouplist,
      handleSubmit,
      store,
      shortcuts
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4e73df;
  font-weight: bold;
}
.el-select {
  width: 100%;
}
/* .demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #858796;
  border-bottom: 1px solid #e3e6f0;
} */
.el-pagination {
  /* display: flex;
      justify-content: space-around;
      align-items: center; */
  margin: 20px 0;
}
</style>

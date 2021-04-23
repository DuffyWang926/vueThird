<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">团购管理</div>
    </template>
    <el-form :model="formInline" class="demo-form-inline" label-position="left" label-width="70px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="活动名称">
            <el-input size="medium" placeholder="单行输入" v-model="queryInfo.activityName"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动时间">
            <!-- <el-date-picker
                      v-model="queryInfo.activityTime"
                      type="daterange"
                      align="center"
                      unlink-panels
                      range-separator="——"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :shortcuts="shortcuts"
                      style="width: 100%"
                    >
                    </el-date-picker> -->
            <el-date-picker
              v-model="queryInfo.activityTime"
              type="daterange"
              align="center"
              unlink-panels
              style="width: 100%"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :shortcuts="shortcuts"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-input size="medium" placeholder="单行输入" v-model="queryInfo.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0">
            <el-button size="medium" type="primary" @click="handleSubmit">查询</el-button>
            <el-button size="medium" type="success" @click="addGroupBuy">添加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">数据列表</div>
    </template>
    <my-table :data="groupsInfo" :columns="columns" :operation-width="260" edit-show @edit="editDetail" edit-text="编辑" preview-show @preview="groupList" preiview-text="拼团列表">
      <template v-slot:userbtns="scope">
        <el-button size="mini" type="danger" @click="closeActivity(scope.row.id)" v-if="scope.row.state != 3">关闭 </el-button>
      </template>
    </my-table>
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: 'GroupBuyManage',
  setup() {
    const $router = useRouter()
    const queryInfo = reactive({
      activityName: '',
      activityTime: [],
      name: '',
      pagenum: 1,
      pagesize: 10
    })
    const groupsInfo = ref([])
    /* const formatEndTime = (date) => {
        date = new Date(date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(padZero).join('-') + ' ' + [hour, minute, second].map(padZero).join(':')
      }
      const formatStartTime = (date) => {
        date = new Date(date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(padZero).join('-') + ' ' + [hour, minute, second].map(padZero).join(':')
      }
      function padZero(num) {
        return num < 10 ? '0' + num : num
      } */
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
    const getgroupbuylist = async () => {
      try {
        const queryInfoCopy = {}
        queryInfoCopy.activityName = queryInfo.activityName
        queryInfoCopy.name = queryInfo.name
        queryInfoCopy.page = queryInfo.pagenum
        queryInfoCopy.limit = queryInfo.pagesize
        console.log(queryInfo.activityTime)
        if (queryInfo.activityTime && queryInfo.activityTime.length == 2) {
          // queryInfoCopy.startDate = formatStartTime(queryInfo.activityTime[0]) || ''
          // queryInfoCopy.endDate = formatEndTime(queryInfo.activityTime[1]) || ''
          queryInfoCopy.startDate = dayjs(queryInfo.activityTime[0]).format('YYYY-MM-DD') || ''
          queryInfoCopy.endDate = dayjs(queryInfo.activityTime[1]).format('YYYY-MM-DD') || ''
        } else {
          queryInfoCopy.startDate = ''
          queryInfoCopy.endDate = ''
        }
        const { data: res } = await service.get('backend/getgroupbuylist', {
          params: queryInfoCopy
        })
        console.log(res)
        res.groupBuyListVos.forEach((item) => {
          switch (item.state) {
            case 0:
              item.stateStr = '未开始'
              break
            case 1:
              item.stateStr = '进行中'
              break
            case 2:
              item.stateStr = '已结束'
              break
            case 3:
              item.stateStr = '已关闭'
              break
          }
        })
        // for (let index = 0; index < res.groupBuyListVos.length; index++) {
        //   const item = res.groupBuyListVos[index]
        //   const { data: numberRes } = await service.get('getgroupNumber', {
        //     params: {
        //       groupId: item.id
        //     }
        //   })
        //   item.openNumber = numberRes.openNumber
        //   item.groupNumber = numberRes.groupNumber
        // }
        groupsInfo.value = res.groupBuyListVos
        count.value = res.total
      } catch (err) {
        console.log(err)
      }
    }
    getgroupbuylist()
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      getgroupbuylist()
    }
    const columns = [
      {
        title: '活动名称',
        prop: 'name'
      },
      {
        title: '拼团商品',
        prop: 'productName'
      },
      {
        title: '团购价',
        prop: 'price'
      },
      {
        title: '拼购积分',
        prop: 'point'
      },
      {
        title: '活动时间',
        prop: 'date'
      },
      {
        title: '状态',
        prop: 'stateStr'
      },
      {
        title: '开团数量',
        prop: 'openNumber'
      },
      {
        title: '成团数量',
        prop: 'groupNumber'
      }
    ]
    const count = ref(0)
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getgroupbuylist()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getgroupbuylist()
    }
    const groupList = (id) => {
      let path = '/groupList/' + id //动态路由跳转的路径声明方式
      $router.push(path)
    }
    const currentPage = ref(1)
    const editDetail = (id) => {
      let path = '/groupBuyEdit'
      $router.push('/groupBuyEdit/' + id)
    }
    const closeActivity = (id) => {
      ElMessageBox.confirm('确定关闭活动吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await service.get('backend/updatestate', {
            params: {
              groupId: id,
              state: 3
            }
          })
          if (res.status == 0) {
            ElMessage.success('已成功关闭！')
          }
          getgroupbuylist()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const addGroupBuy = () => {
      $router.push({
        path: '/groupBuyAdd'
      })
    }

    return {
      queryInfo,
      getgroupbuylist,
      handleSubmit,
      groupsInfo,
      columns,
      count,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      groupList,
      editDetail,
      closeActivity,
      addGroupBuy,
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

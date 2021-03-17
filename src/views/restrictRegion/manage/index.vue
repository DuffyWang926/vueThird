<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>限售区域管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-width="80px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-input
              v-model="queryInfo.goodsName"
              placeholder="商品名称"
              size="large"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区域名称">
            <el-input
              v-model="queryInfo.regionName"
              placeholder="区域名称"
              size="large"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button size="large" type="success" @click="handleSubmit"
            >查询</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button size="large" type="danger" @click="handleGroupDelete"
            >批量删除</el-button
          >
        </el-col>
        <el-col :span="2" :offset="6" style="justify-content: flex-end">
          <el-button
            size="large"
            type="info"
            @click="$router.push({ path: '/restrictRegionToAddRule' })"
            >添加规则</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <my-table
      :data="restrictRegions"
      :columns="columns"
      :operation-width="200"
      delete-show
      @delete="handleDelete"
      deleteDialogText="删除该规则将实时生效，是否删除？"
      selection-show
      v-model:selected="selected"
    ></my-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="queryInfo.pagenum"
      :page-size="queryInfo.pagesize"
      layout="total, prev, pager, next, sizes, jumper"
      :total="count"
      :page-sizes="[10, 20, 50, 100]"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '@/utils/request'
export default {
  name: 'RestrictRegionManage',
  setup() {
    const $router = useRouter()
    const queryInfo = reactive({
      goodsName: '',
      regionName: '',
      pagenum: 1,
      pagesize: 10
    })
    const restrictRegions = ref([])
    const getRestrictRegions = async () => {
      try {
        const { data: res } = await service.get('getRestrictRegions', {
          params: queryInfo
        })
        console.log(res)
        restrictRegions.value = res.restrictRegions
        count.value = res.count
      } catch (err) {
        console.log(err)
      }
    }
    getRestrictRegions()
    const selected = ref([])
    const columns = [
      {
        title: '商品ID',
        prop: 'goodsId'
      },
      {
        title: '商品名称',
        prop: 'goodsName'
      },
      {
        title: '区域编码',
        prop: 'regionCode'
      },
      {
        title: '区域名称',
        prop: 'regionName'
      },
      {
        title: '创建者',
        prop: 'creator'
      },
      {
        title: '创建时间',
        prop: 'createTime'
      }
    ]
    const count = ref(0)
    const handleDelete = async (id) => {
      console.log(id)
      const res = await service.get('deleteRestrictRegion', {
        params: { id }
      })
      if (restrictRegions.value.length === 1) {
        if (queryInfo.pagenum > 1) {
          queryInfo.pagenum--
        }
      }
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功！'
        })
        getRestrictRegions()
      }
    }
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getRestrictRegions()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getRestrictRegions()
    }
    const handleGroupDelete = () => {
      if (selected.value.length === 0) {
        return ElMessage({
          type: 'error',
          message: '请先选择要删除的限定规则!'
        })
      }
      ElMessageBox.confirm('确认进行批量删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await service.post(
            'deleteRestrictRegionGroup',
            {
              ids: selected.value.map((item) => item.id)
            }
          )
          if (restrictRegions.value.length === selected.value.length) {
            if (queryInfo.pagenum > 1) {
              queryInfo.pagenum--
            }
          }
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
          getRestrictRegions()
          selected.value = []
          console.log(res)
          console.log(res.message)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      getRestrictRegions()
    }
    return {
      queryInfo,
      restrictRegions,
      getRestrictRegions,
      selected,
      columns,
      count,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
      $router,
      handleGroupDelete,
      handleSubmit
    }
  }
}
</script>

<style scoped>
</style>
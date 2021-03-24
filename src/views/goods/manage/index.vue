<template>
  <el-card @click="categoryShowFlag = false">
    <template #header>
      <div class="card-header">
        <span>商品管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-width="80px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商品名称" prop="name">
            <el-input
              v-model="queryInfo.name"
              placeholder="商品名称"
              size="large"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品分类" prop="categoryIds">
            <my-category-select
              v-model="queryInfo.categoryIds"
              v-model:show-flag="categoryShowFlag"
              v-model:single-value="queryInfo.categoryId"
            ></my-category-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓库" prop="warehouseId">
            <el-select placeholder="仓库" v-model="queryInfo.warehouseId">
              <el-option label="全部" value="-1"></el-option>
              <el-option
                v-for="item in warehouses"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-select placeholder="状态" v-model="queryInfo.status">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="-1"></el-option>
              <el-option label="全部" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存数量" prop="stockNum">
            <el-select placeholder="库存数量" v-model="queryInfo.stockNum">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="小于100" value="100"></el-option>
              <el-option label="小于500" value="500"></el-option>
              <el-option label="小于1000" value="1000"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商品类型" prop="type">
            <el-select placeholder="商品类型" v-model="queryInfo.type">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="普通商品" value="1"></el-option>
              <el-option label="组合商品" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="创建时间" prop="dateRange">
            <el-date-picker
              v-model="queryInfo.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button size="large" type="success" @click="handleSubmit"
            >查询</el-button
          >
          <el-button size="large" type="primary" @click="addProduct"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <my-table
      :data="productList"
      :columns="columns"
      :operation-width="200"
      edit-show
      delete-show
      @delete="handleDelete"
      deleteDialogText="确定删除？"
      switch-show
      @switch="handleSwitch"
      switch-prop="isOnSale"
      switch-open-text="下架"
      switch-closed-text="上架"
      switch-open-dialog-text="确认上架该商品？"
      switch-close-dialog-text="确认下架该商品？"
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
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import lodash from 'lodash'
import service from '@/utils/request'
export default {
  name: 'GoodsManage',
  setup() {
    const router = useRouter()
    const queryInfo = reactive({
      name: '',
      categoryIds: [],
      categoryId: '',
      warehouseId: '',
      status: '1',
      stockNum: '-1',
      type: '-1',
      startDate: '',
      endDate: '',
      dateRange: [],
      pagenum: 1,
      pagesize: 10
    })
    const categoryShowFlag = ref(false)
    const warehouses = ref([])
    const getWarehouses = async () => {
      const { data: res } = await service.get('getAllWarehouses')
      warehouses.value = res.warehouses
    }
    getWarehouses()
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      getProductList()
    }
    const getProductList = async () => {
      const startDate = new Date(queryInfo.dateRange[0])
      queryInfo.startDate =
        startDate.getFullYear() +
        '-' +
        (startDate.getMonth() + 1) +
        '-' +
        startDate.getDate()
      const endDate = new Date(queryInfo.dateRange[1])
      queryInfo.endDate =
        endDate.getFullYear() +
        '-' +
        (endDate.getMonth() + 1) +
        '-' +
        endDate.getDate()
      const realQueryInfo = lodash.cloneDeep(queryInfo)
      delete realQueryInfo.categoryIds
      delete realQueryInfo.dateRange
      const { data: res } = await service.get('/productItemList', {
        params: queryInfo
      })
      productList.value = res.productList
      productList.value.forEach((item) => {
        item.specification = [item.colour, item.size]
          .filter((item) => item)
          .join(';')
        item.typeString = item.type == 1 ? '普通商品' : '组合商品'
        item.isOnSaleText = item.isOnSale == 1 ? '在售' : '下架'
        item.isOnSale = item.isOnSale == 1 ? true : false
      })
      count.value = res.count
    }
    getProductList()
    const productList = ref([])
    const addProduct = () => {
      router.push({ path: '/goodsAdd' })
    }
    const columns = [
      {
        title: '编号',
        prop: 'id'
      },
      { title: '商品图', prop: 'img', image: true, width: 150 },
      { title: '名称', prop: 'productName' },
      { title: '规格', prop: 'specification' },
      { title: '商品分类', prop: 'categoryName' },
      { title: '商品类型', prop: 'typeString' },
      { title: '子商品编码', prop: 'skuCode' },
      { title: '仓库', prop: 'wardhouseName' },
      { title: '商品库存', prop: 'stock' },
      { title: '现价', prop: 'nowPrice' },
      { title: '创建时间', prop: 'createTime' },
      { title: '是否在售', prop: 'isOnSaleText' }
    ]
    const handleDelete = async (id) => {
      console.log(id)
      const res = await service.get('deleteProduct', {
        params: { id }
      })
      if (productList.value.length === 1) {
        if (queryInfo.pagenum > 1) {
          queryInfo.pagenum--
        }
      }
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功！'
        })
        getProductList()
      }
    }
    const handleSwitch = async (row) => {
      console.log(row.id)
      const res = await service.get('setProductIsOnSale', {
        params: { id: row.id, isOnSale: row.isOnSale ? 1 : 2 }
      })
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: row.isOnSale ? '上架成功' : '下架成功'
        })
        getProductList()
      }
    }
    const count = ref(0)
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getProductList()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getProductList()
    }
    return {
      queryInfo,
      categoryShowFlag,
      warehouses,
      handleSubmit,
      addProduct,
      productList,
      columns,
      handleDelete,
      handleSwitch,
      count,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped lang="scss">
.el-select,
/deep/.el-date-editor {
  width: 100%;
}
</style>
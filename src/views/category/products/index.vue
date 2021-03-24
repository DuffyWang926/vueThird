<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
              path: '/categoryFirst',
              query: {
                firstCategoryName: firstCategoryName
              }
            }"
            >{{ firstCategoryName }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{
              path: '/categorySecond',
              query: {
                firstCategoryId: queryInfo.firstCategoryId,
                firstCategoryName: firstCategoryName,
                secondCategoryName: secondCategoryName
              }
            }"
            >{{ secondCategoryName }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :to="{
              path: '/categoryThird',
              query: {
                firstCategoryId: queryInfo.firstCategoryId,
                secondCategoryId: queryInfo.secondCategoryId,
                firstCategoryName: firstCategoryName,
                secondCategoryName: secondCategoryName,
                thirdCategoryName: thirdCategoryName
              }
            }"
            >{{ thirdCategoryName }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </template>
    <el-form :model="queryInfo" label-width="40px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input
              v-model="queryInfo.productName"
              placeholder="请输入名称"
              size="large"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button size="large" type="success" @click="handleSubmit"
            >查询</el-button
          >
          <el-button size="large" type="info" @click="addProduct"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <my-table
      :data="products"
      :columns="columns"
      :operation-width="240"
      edit-show
      @edit="editProduct"
      delete-show
      @delete="deleteProduct"
    >
    </my-table>
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
    <el-dialog
      title="添加商品"
      v-model="addDialogShow"
      width="500px"
      @close="handleClose"
      destroy-on-close
    >
      <my-goods-select textareaShow v-model="goodsIds"></my-goods-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      title="修改商品"
      v-model="editDialogShow"
      width="500px"
      @close="handleClose"
      destroy-on-close
    >
      <el-form label-width="40px" label-position="left" :model="editForm">
        <el-form-item label="级别" prop="currentEditLevel">
          <el-input v-model="editForm.currentEditLevel"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '@/utils/request'
export default {
  setup() {
    const queryInfo = reactive({
      firstCategoryId: useRoute().query.firstCategoryId,
      secondCategoryId: useRoute().query.secondCategoryId,
      thirdCategoryId: useRoute().query.thirdCategoryId,
      productName: '',
      pagenum: 1,
      pagesize: 10
    })
    const firstCategoryName = ref('')
    const secondCategoryName = ref('')
    const thirdCategoryName = ref('')
    const getFirstCategory = async () => {
      const { data: res } = await service.get('getFirstCategoryById', {
        params: {
          id: queryInfo.firstCategoryId
        }
      })
      firstCategoryName.value = res.category.categoryName
    }
    getFirstCategory()
    const getSecondCategory = async () => {
      const { data: res } = await service.get('getSecondCategoryById', {
        params: {
          id: queryInfo.secondCategoryId
        }
      })
      secondCategoryName.value = res.category.categoryName
    }
    getSecondCategory()
    const getThirdCategory = async () => {
      const { data: res } = await service.get('getThirdCategoryById', {
        params: {
          id: queryInfo.thirdCategoryId
        }
      })
      thirdCategoryName.value = res.category.categoryName
    }
    getThirdCategory()
    const products = ref([])
    const count = ref(0)
    const getProducts = async () => {
      const { data: res } = await service.get('getProductByThirdCategoryId', {
        params: queryInfo
      })
      console.log(res)
      products.value = res.products
      count.value = res.count
    }
    getProducts()
    const columns = [
      {
        title: '产品名称',
        prop: 'name'
      },
      { title: '排序级别', prop: 'level' }
    ]
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      getProducts()
    }
    const addDialogShow = ref(false)
    const addProduct = () => {
      addDialogShow.value = true
    }
    const goodsIds = ref([])
    const handleAdd = async () => {
      if (goodsIds.value.length === 0) {
        return ElMessage({
          type: 'error',
          message: '请选择商品'
        })
      }
      const res = await service.post('addProductsToThirdCategory', {
        goodsIds: goodsIds.value
      })
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
      }
      addDialogShow.value = false
    }
    const handleClose = () => {
      goodsIds.value = []
      editForm.currentEditId = null
      editForm.currentEditLevel = ''
    }
    const editForm = reactive({
      currentEditId: null,
      currentEditLevel: ''
    })
    const editDialogShow = ref(false)
    const editProduct = async (id) => {
      editForm.currentEditId = id
      editForm.currentEditLevel = products.value.find(
        (item) => item.id === id
      ).level
      editDialogShow.value = true
    }
    const handleEdit = async () => {
      const res = await service.post('editProductLevel', editForm)
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '修改成功！'
        })
        editDialogShow.value = false
      } else {
        ElMessage({
          type: 'success',
          message: '修改失败！'
        })
      }
      getProducts()
    }
    const deleteProduct = async (id) => {
      const res = await service.get('deleteProductFromThirdCategory', {
        params: { id }
      })
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功！'
        })
      } else {
        ElMessage({
          type: 'error',
          message: '删除失败！'
        })
      }
      if (products.value.length === 1) {
        if (queryInfo.pagenum > 1) {
          queryInfo.pagenum--
        }
      }
      getProducts()
    }
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getProducts()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getProducts()
    }
    return {
      queryInfo,
      firstCategoryName,
      secondCategoryName,
      thirdCategoryName,
      products,
      columns,
      addDialogShow,
      addProduct,
      handleAdd,
      goodsIds,
      handleClose,
      handleSubmit,
      editForm,
      editDialogShow,
      editProduct,
      handleEdit,
      deleteProduct,
      count,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped lang="scss">
.el-breadcrumb {
  font-size: 16px;
  /deep/.el-breadcrumb__inner {
    background-color: #f8f9fc;
    color: #5076dc !important;
  }
  /deep/ .el-breadcrumb__inner a,
  /deep/ .el-breadcrumb__inner.is-link {
    font-weight: normal !important;
  }
}
</style>
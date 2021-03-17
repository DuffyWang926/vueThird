<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </template>
    <el-form :model="queryInfo" label-width="40px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input
              v-model="queryInfo.categoryName"
              placeholder="请输入名称"
              size="large"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="large" type="success" @click="handleSubmit"
            >查询</el-button
          >
          <el-button size="large" type="info" @click="addCategory"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <my-table
      :data="categories"
      :columns="columns"
      :operation-width="240"
      edit-show
      @edit="editCategory"
      delete-show
      @delete="deleteCategory"
    >
      <template v-slot:userbtns="scope">
        <el-button size="mini" type="primary" @click="goToSecond(scope.row.id)"
          >二级类目</el-button
        >
      </template>
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
  </el-card>
  <div v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" width="500px" @close="handleClose">
      <template #title>
        {{ currentEditId ? '编辑一级分类' : '新增一级分类' }}
      </template>
      <el-form
        ref="editOrAddFormRef"
        :model="editOrAddForm"
        :rules="editOrAddFormRules"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="名称" prop="categoryName">
          <el-input
            v-model="editOrAddForm.categoryName"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input
            v-model="editOrAddForm.type"
            placeholder="请输入类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-input
            v-model="editOrAddForm.level"
            placeholder="请输入级别"
          ></el-input>
        </el-form-item>
        <el-form-item label="背景图" prop="background">
          <my-upload
            v-model:image-list="editOrAddForm.background"
            :multiple="false"
          ></my-upload>
        </el-form-item>
        <el-form-item label="图片类型" prop="imageType">
          <el-select v-model="editOrAddForm.imageType" placeholder="请输入级别">
            <el-option label="----请选择----" value="" disabled></el-option>
            <el-option label="无跳转" :value="1"></el-option>
            <el-option label="商品详情页" :value="2"></el-option>
            <el-option label="商品列表页" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择商品"
          prop="goodsId"
          v-if="editOrAddForm.imageType == 2"
        >
          <el-select v-model="editOrAddForm.goodsId" placeholder="请输入级别">
            <el-option label="----请选择----" value="" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品列表"
          prop="goodsIds"
          v-if="editOrAddForm.imageType == 3"
        >
          <my-goods-select
            textareaShow
            v-model="editOrAddForm.goodsIds"
          ></my-goods-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddOrEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '@/utils/request'
export default {
  name: 'FirstCategory',
  setup() {
    const queryInfo = reactive({
      categoryName: useRoute().query.firstCategoryName || '',
      pagenum: 1,
      pagesize: 10
    })
    const getCategories = async () => {
      const { data: res } = await service.get('getFirstCategories', {
        params: queryInfo
      })
      categories.value = res.firstCategories
      count.value = res.count
    }
    getCategories()
    const handleSubmit = () => {
      queryInfo.pagenum = 1
      getCategories()
    }
    const addCategory = () => {
      // uploadRef.value.refresh()
      editOrAddForm.categoryName = ''
      editOrAddForm.level = ''
      editOrAddForm.background = []
      editOrAddForm.type = ''
      editOrAddForm.imageType = ''
      editOrAddForm.goodsId = ''
      editOrAddForm.goodsIds = []
      dialogVisible.value = true
    }
    const columns = [
      {
        title: 'id',
        prop: 'id'
      },
      { title: '一级类目名称', prop: 'categoryName' },
      { title: '级别', prop: 'level' }
    ]
    const categories = ref([])
    const count = ref(0)
    const editCategory = async (id) => {
      // uploadRef.value.refresh()
      currentEditId.value = id
      const { data: res } = await service.get('getFirstCategoryById', {
        params: { id }
      })
      const category = res.category
      console.log('category:', category)
      editOrAddForm.categoryName = category.categoryName
      editOrAddForm.level = category.level
      editOrAddForm.background = [category.backgroundImage]
      editOrAddForm.type = category.type
      editOrAddForm.imageType = category.imageType
      editOrAddForm.goodsId = String(category.goodsId)
      editOrAddForm.goodsIds = category.goodsIds
      dialogVisible.value = true
    }
    const deleteCategory = async (id) => {
      const res = await service.get('deleteFirstCategory', {
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
      if (categories.value.length === 1) {
        if (queryInfo.pagenum > 1) {
          queryInfo.pagenum--
        }
      }
      getCategories()
    }
    const $router = useRouter()
    const goToSecond = (id) => {
      $router.push({
        path: '/categorySecond',
        query: {
          firstCategoryId: id
        }
      })
    }
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getCategories()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getCategories()
    }
    const dialogVisible = ref(false)
    watch(dialogVisible, (newValue) => {
      if (!newValue) {
        currentEditId.value = null
      }
    })
    const goodsList = ref([])
    const getAllGoods = async () => {
      const { data: res } = await service.get('getAllGoodsList')
      goodsList.value = res.goodsList
      console.log(goodsList.value)
    }
    getAllGoods()
    const handleAddOrEdit = () => {
      editOrAddFormRef.value.validate(async (valid) => {
        if (valid) {
          console.log('validate')
          if (currentEditId.value != null) {
            const data = {
              id: currentEditId.value,
              categoryName: editOrAddForm.categoryName,
              type: editOrAddForm.type,
              level: editOrAddForm.type,
              background: editOrAddForm.background[0],
              imageType: editOrAddForm.imageType,
              goodsId: editOrAddForm.goodsId,
              goodsIds: editOrAddForm.goodsIds
            }
            const res = await service.post('editFirstCategoryById', data)
            if (res.status === 0) {
              ElMessage({
                type: 'success',
                message: '修改成功'
              })
            }
            getCategories()
          } else {
            const data = {
              categoryName: editOrAddForm.categoryName,
              type: editOrAddForm.type,
              level: editOrAddForm.type,
              background: editOrAddForm.background[0],
              imageType: editOrAddForm.imageType,
              goodsId: editOrAddForm.goodsId,
              goodsIds: editOrAddForm.goodsIds
            }
            const res = await service.post('addFirstCategory', data)
            if (res.status === 0) {
              ElMessage({
                type: 'success',
                message: '添加成功'
              })
            }
            getCategories()
          }
          dialogVisible.value = false
        }
      })
    }
    const handleClose = () => {
      currentEditId.value = null
      editOrAddForm.categoryName = ''
      editOrAddForm.level = ''
      editOrAddForm.background = []
      editOrAddForm.type = ''
      editOrAddForm.imageType = ''
      editOrAddForm.goodsId = ''
      editOrAddForm.goodsIds = []
    }
    const currentEditId = ref(null)
    const editOrAddFormRef = ref(null)
    const editOrAddForm = reactive({
      categoryName: '',
      type: '',
      level: '',
      background: [],
      imageType: '',
      goodsId: '',
      goodsIds: []
    })
    const editOrAddFormRules = {
      categoryName: [
        { required: true, message: '请输入名称', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入级别', trigger: 'blur' },
        { pattern: /^[1-9]\d*$/, message: '必须是正整数', trigger: 'blur' }
      ]
    }
    // const uploadRef = ref(null)
    return {
      queryInfo,
      addCategory,
      handleSubmit,
      columns,
      categories,
      count,
      editCategory,
      deleteCategory,
      goToSecond,
      handleSizeChange,
      handleCurrentChange,
      dialogVisible,
      goodsList,
      handleAddOrEdit,
      handleClose,
      currentEditId,
      editOrAddFormRef,
      editOrAddForm,
      editOrAddFormRules
      // uploadRef
    }
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 16px;
  /deep/.el-breadcrumb__inner {
    background-color: #f8f9fc;
    color: #5076dc !important;
  }
}
</style>
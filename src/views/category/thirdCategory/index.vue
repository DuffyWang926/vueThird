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
        <el-col :span="8">
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
        <el-button size="mini" type="primary" @click="goToProduct(scope.row.id)"
          >对应商品</el-button
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
  <el-dialog v-model="dialogVisible" width="500px" @close="handleClose">
    <template #title>
      {{ currentEditId ? '编辑三级分类' : '新增三级分类' }}
    </template>
    <el-form
      ref="editOrAddFormRef"
      :model="editOrAddForm"
      :rules="editOrAddFormRules"
      label-width="80px"
      label-position="right"
    >
      <el-form-item label="上级分类">
        <el-input
          :model-value="firstCategoryName + '-' + secondCategoryName"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="categoryName">
        <el-input
          v-model="editOrAddForm.categoryName"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-input
          v-model="editOrAddForm.level"
          placeholder="请输入级别"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEdit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '@/utils/request'
export default {
  name: 'SecondCategory',
  setup() {
    const router = useRouter()
    const queryInfo = reactive({
      firstCategoryId: useRoute().query.firstCategoryId,
      secondCategoryId: useRoute().query.secondCategoryId,
      categoryName: '',
      pagenum: 1,
      pagesize: 10
    })
    const firstCategoryName = ref('')
    const secondCategoryName = ref('')
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
    const getCategories = async () => {
      const { data: res } = await service.get('getThirdCategories', {
        params: queryInfo
      })
      categories.value = res.thirdCategories
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
      dialogVisible.value = true
    }
    const columns = [
      {
        title: 'id',
        prop: 'id'
      },
      { title: '二级类目名称', prop: 'categoryName' },
      { title: '级别', prop: 'level' }
    ]
    const categories = ref([])
    const count = ref(0)
    const editCategory = async (id) => {
      // uploadRef.value.refresh()
      currentEditId.value = id
      const { data: res } = await service.get('getThirdCategoryById', {
        params: { id }
      })
      const category = res.category
      console.log(category)
      editOrAddForm.categoryName = category.categoryName
      editOrAddForm.level = category.level
      dialogVisible.value = true
    }
    const deleteCategory = async (id) => {
      const res = await service.get('deleteThirdCategory', {
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
    const goToProduct = async (id) => {
      router.push({
        path: '/categoryProducts',
        query: {
          firstCategoryId: queryInfo.firstCategoryId,
          secondCategoryId: queryInfo.secondCategoryId,
          thirdCategoryId: id
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
    const handleAddOrEdit = () => {
      editOrAddFormRef.value.validate(async (valid) => {
        if (valid) {
          console.log('validate')
          if (currentEditId.value != null) {
            const data = {
              id: currentEditId.value,
              categoryName: editOrAddForm.categoryName,
              level: editOrAddForm.level
            }
            const res = await service.post('editThirdCategoryById', data)
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
              level: editOrAddForm.level
            }
            const res = await service.post('addThirdCategory', data)
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
    }
    const currentEditId = ref(null)
    const editOrAddFormRef = ref(null)
    const editOrAddForm = reactive({
      type: '',
      level: ''
    })
    const editOrAddFormRules = {
      categoryName: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ],
      level: [
        { required: true, message: '请输入级别', trigger: 'blur' },
        { pattern: /^[1-9]\d*$/, message: '必须是正整数', trigger: 'blur' }
      ]
    }
    // const uploadRef = ref(null)
    return {
      queryInfo,
      firstCategoryName,
      secondCategoryName,
      addCategory,
      handleSubmit,
      columns,
      categories,
      count,
      editCategory,
      deleteCategory,
      goToProduct,
      handleSizeChange,
      handleCurrentChange,
      dialogVisible,
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
  /deep/ .el-breadcrumb__inner a,
  /deep/ .el-breadcrumb__inner.is-link {
    font-weight: normal !important;
  }
}
.el-breadcrumb {
  font-size: 16px;
  .el-breadcrumb__inner {
    background-color: #f8f9fc;
    color: #5076dc !important;
  }
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: normal !important;
  }
}
</style>
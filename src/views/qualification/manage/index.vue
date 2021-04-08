<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>资质管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-position="left" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input v-model="queryInfo.title" placeholder="请输入资质名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size="large" type="primary" @click="handleSearch">查询</el-button>
          <el-button size="large" type="success" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <my-table :data="qualifications" :columns="columns" :operation-width="200" edit-show delete-show @edit="editClicked" @delete="handleDelete"> </my-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="queryInfo.page"
      :page-size="queryInfo.limit"
      layout="total, prev, pager, next, sizes, jumper"
      :total="count"
      :page-sizes="[10, 20, 50, 100]"
      background
    >
    </el-pagination>
  </el-card>
  <el-dialog v-model="addDialogVisible" width="500px" @close="handleClose" destroy-on-close>
    <template #title>新增资质</template>
    <el-form :model="addForm" ref="addFormRef" label-position="left" label-width="80px">
      <el-form-item label="资质标题" prop="title" :rules="[{ required: true, message: '资质标题不能为空！', trigger: 'blur' }]">
        <el-input v-model="addForm.title"></el-input>
      </el-form-item>
      <el-form-item label="资质内容" prop="content" :rules="[{ required: true, message: '资质内容不能为空！', trigger: 'blur' }]">
        <el-input v-model="addForm.content"></el-input>
      </el-form-item>
      <el-form-item
        label="资质图片"
        prop="imageList"
        :rules="[
          { required: true, message: '资质图片不能为空！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length !== 1) {
                console.log('资质图片不能为空！')
                callback(new Error('请选择资质图片！'))
              } else {
                callback()
              }
            },
            trigger: ['blur, change']
          }
        ]"
      >
        <my-upload v-model:image-list="addForm.imageList">
          <div style="font-size: 16px; color: red">注：图片上传不得超过10M。</div>
        </my-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEdit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import service from '@/utils/request'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
export default {
  setup() {
    const queryInfo = reactive({
      title: '',
      page: 1,
      limit: 10
    })
    const qualifications = ref([])
    const count = ref(0)
    const getQualifications = async () => {
      const { data: res } = await service.get('backend/getQualifications', {
        params: queryInfo
      })
      qualifications.value = res.qualifications
      count.value = res.count
    }
    getQualifications()
    const handleSearch = () => {
      queryInfo.page = 1
      getQualifications()
    }
    const columns = [
      {
        title: '资质标题',
        prop: 'title'
      },
      {
        title: '资质图片',
        prop: 'image',
        image: true
      },
      {
        title: '资质内容',
        prop: 'content'
      }
    ]
    const handleSizeChange = (val) => {
      queryInfo.page = 1
      queryInfo.limit = val
      getQualifications()
    }
    const handleCurrentChange = (val) => {
      queryInfo.page = val
      getQualifications()
    }
    const addDialogVisible = ref(false)
    const addForm = reactive({
      id: null,
      title: '',
      content: '',
      imageList: []
    })
    const addFormRef = ref(null)
    const handleClose = () => {
      addForm.id = null
      addForm.title = ''
      addForm.content = ''
      addForm.imageList = []
    }
    const handleAddOrEdit = () => {
      addFormRef.value.validate(async (valid) => {
        if (valid) {
          const addFormCopy = {}
          addFormCopy.title = addForm.title
          addFormCopy.content = addForm.content
          addFormCopy.image = addForm.imageList[0]
          if (addForm.id) {
            addFormCopy.id = addForm.id
            const res = await service.post('backend/editQualification', addFormCopy)
            if (res.status == 0) {
              ElMessage.success('修改成功！')
              addDialogVisible.value = false
            }
          } else {
            const res = await service.post('backend/addQualification', addFormCopy)
            if (res.status == 0) {
              ElMessage.success('添加成功！')
              addDialogVisible.value = false
            }
          }
        } else {
          if (addForm.id) {
            ElMessage.error('编辑失败！请检查标红的表单项！')
          } else {
            ElMessage.error('添加失败！请检查标红的表单项！')
          }
        }
      })
    }
    const editClicked = async (id) => {
      const { data: res } = await service.get('backend/getQualificationById', {
        params: {
          id
        }
      })
      console.log(res)
      addForm.id = id
      addForm.title = res.title
      addForm.content = res.content
      addForm.imageList = [res.image]
      addDialogVisible.value = true
    }
    const handleDelete = async (id) => {
      const res = await service.post('backend/deleteQualification')
      if (res.status == 0) {
        ElMessage.success('删除成功！')
        if (qualifications.value.length === 1) {
          if (queryInfo.page > 1) {
            queryInfo.page--
          }
        }
      }
    }
    return {
      queryInfo,
      handleSearch,
      qualifications,
      count,
      columns,
      handleSizeChange,
      handleCurrentChange,
      addDialogVisible,
      addForm,
      addFormRef,
      handleClose,
      handleAddOrEdit,
      editClicked,
      handleDelete
    }
  }
}
</script>

<style scoped lang="scss">
</style>
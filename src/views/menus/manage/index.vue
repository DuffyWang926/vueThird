<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>菜单管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-position="left" label-width="70px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="名称" prop="name">
            <el-input v-model="queryInfo.username" placeholder="请输入名称" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上级名称" prop="pname">
            <el-input v-model="queryInfo.pid" placeholder="请输入上级名称" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size="large" type="primary" @click="handleSearch">查询</el-button>
          <el-button size="large" type="success" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <my-table :data="menus" :columns="columns" operation-width="200px" edit-show @edit="editMenu" delete-show @delete="deleteMenu"> </my-table> -->
    <el-table :data="menus">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="上级ID" prop="pid"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="类型">
        <template #default="scope">
          <el-tag v-if="scope.row.type == 1">目录</el-tag>
          <el-tag v-if="scope.row.type == 2" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.type == 3" type="danger">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="菜单URL" prop="url"></el-table-column>
      <el-table-column label="菜单排序" prop="index"></el-table-column>
      <el-table-column label="是否显示" prop="isShow">
        <template #default="scope">
          <el-switch :model-value="scope.row.isShow" @click="changeIsShow(scope.row.id, !scope.row.isShow)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" prop="createTime" width="150"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button type="warning" size="mini" @click="editMenu(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  <el-dialog v-model="addDialogVisible" width="500px" @close="handleAddClose" destroy-on-close>
    <template #title>
      <span v-if="addForm.id">修改菜单项</span>
      <span v-else>添加菜单项</span>
    </template>
    <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="80px">
      <el-form-item label="类别">
        <el-radio-group v-model="addForm.type" :disabled="addForm.id">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限名" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单url" v-if="addForm.type === 2" prop="url">
        <el-input v-model="addForm.url"></el-input>
      </el-form-item>
      <el-form-item label="上级目录" v-if="addForm.type === 2" prop="pid">
        <el-select v-model="addForm.pid">
          <el-option v-for="item in allCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级菜单" v-if="addForm.type === 3" prop="pid">
        <el-select v-model="addForm.pid">
          <el-option v-for="item in allMenuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单排序" v-if="addForm.type !== 3" prop="index">
        <el-input v-model="addForm.index"></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-radio-group v-model="addForm.isShow">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleAddOrEdit">提交</el-button>
        <el-button @click="resetFields">重置</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive } from 'vue'
import service from '@/utils/request'
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
  name: 'MenusManage',
  setup() {
    const queryInfo = reactive({
      name: '',
      pname: '',
      pagenum: 1,
      pagesize: 10
    })
    const handleSearch = () => {
      queryInfo.page = 1
      getMenus()
    }
    const getMenus = async () => {
      const { data: res } = await service.post('getMenus', queryInfo)
      menus.value = res.menus
      count.value = res.count
    }
    getMenus()
    const menus = ref([])
    const count = ref(0)
    const editMenu = async (id) => {
      const { data: res } = await service.post('getMenuById', {
        id
      })
      const menu = res
      addForm.id = id
      addForm.type = menu.type
      addForm.name = menu.name
      addForm.url = menu.url
      addForm.pid = menu.pid || ''
      addForm.index = menu.index
      addForm.isShow = menu.isShow
      addDialogVisible.value = true
    }
    const deleteMenu = (id) => {
      ElMessageBox.confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // console.log(id)
          const res = await service.post('deleteMenu', { id })
          if (res.status == 0) {
            ElMessage.success('删除成功')
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const changeIsShow = async (id, isShow) => {
      console.log(id, isShow)
      const res = await service.post('changeIsShow', {
        id,
        isShow
      })
      if (res.status == 0) {
        if (isShow) {
          ElMessage.success('已成功显示菜单')
        } else {
          ElMessage.success('已成功隐藏菜单')
        }
        menus.value.find((item) => item.id == id).isShow = isShow
      }
    }
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getMenus()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getMenus()
    }
    const addDialogVisible = ref(false)
    const addFormRef = ref(null)
    const addForm = reactive({
      id: null,
      type: 1,
      name: '',
      url: '',
      pid: '',
      index: '',
      isShow: true
    })
    const addFormRules = {
      type: [
        {
          required: true,
          message: '请选择类型！',
          trigger: ['blur', 'change']
        }
      ],
      name: [
        {
          required: true,
          message: '请输入权限名！',
          trigger: 'blur'
        }
      ],
      url: [
        {
          required: true,
          message: '请输入菜单对应的url！',
          trigger: 'blur'
        }
      ],
      pid: [
        {
          required: true,
          message: '请选择父项！',
          trigger: 'blur'
        }
      ],
      index: [
        {
          required: true,
          message: '请输入菜单排序！',
          trigger: 'blur'
        },
        {
          validator: (rule, value, callback) => {
            if (isNaN(value) || value <= 0) {
              callback(new Error('菜单排序必须为正整数！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }
    const handleAddClose = () => {
      addForm.id = null
      addForm.type = 1
      addForm.name = ''
      addForm.url = ''
      addForm.pid = ''
      addForm.index = ''
      addForm.isShow = true
    }
    const resetFields = () => {
      handleAddClose()
    }
    const handleAddOrEdit = () => {
      if (addForm.id) {
        handleEdit()
      } else {
        handleAdd()
      }
    }
    const handleAdd = () => {
      addFormRef.value.validate(async (valid) => {
        if (valid) {
          const addFormCopy = {}
          addFormCopy.type = addForm.type
          addFormCopy.name = addForm.name
          // addFormCopy.index = addForm.index
          addFormCopy.isShow = addForm.isShow
          switch (addFormCopy.type) {
            case 1:
              addFormCopy.index = addForm.index
              break
            case 2:
              addFormCopy.pid = addForm.pid
              addFormCopy.url = addForm.url
              addFormCopy.index = addForm.index
              break
            case 3:
              addFormCopy.pid = addForm.pid
              break
          }
          const res = await service.post('addMenu', addFormCopy)
          if (res.status == 0) {
            ElMessage.success('添加成功！')
          }
          addDialogVisible.value = false
        } else {
          ElMessage.error('添加失败！请检查标红的表单项！')
          return false
        }
      })
    }
    const handleEdit = () => {
      addFormRef.value.validate(async (valid) => {
        if (valid) {
          const addFormCopy = {}
          addFormCopy.id = addForm.id
          // addFormCopy.type = addForm.type
          addFormCopy.name = addForm.name
          addFormCopy.isShow = addForm.isShow
          switch (addFormCopy.type) {
            case 1:
              addFormCopy.index = addForm.index
              break
            case 2:
              addFormCopy.pid = addForm.pid
              addFormCopy.url = addForm.url
              addFormCopy.index = addForm.index
              break
            case 3:
              addFormCopy.pid = addForm.pid
              break
          }
          const res = await service.post('editMenu', addFormCopy)
          if (res.status == 0) {
            ElMessage.success('修改成功！')
          }
          addDialogVisible.value = false
        } else {
          ElMessage.error('修改失败！请检查标红的表单项！')
          return false
        }
      })
    }
    const allCategoryList = ref([])
    const allMenuList = ref([])
    const getAllCategories = async () => {
      const { data: res } = await service.post('getAllCategories')
      allCategoryList.value = res
    }
    const getAllMenus = async () => {
      const { data: res } = await service.post('getAllMenus')
      allMenuList.value = res
    }
    getAllCategories()
    getAllMenus()
    return {
      queryInfo,
      handleSearch,
      menus,
      count,
      // columns,
      editMenu,
      deleteMenu,
      changeIsShow,
      handleSizeChange,
      handleCurrentChange,
      addDialogVisible,
      addFormRef,
      addForm,
      addFormRules,
      handleAddClose,
      resetFields,
      handleAddOrEdit,
      allMenuList,
      allCategoryList
    }
  }
}
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
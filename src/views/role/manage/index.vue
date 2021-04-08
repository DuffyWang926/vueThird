<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>权限管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-position="left" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="角色">
            <el-select v-model="queryInfo.roleId" placeholder="请选择" filterable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in allRoles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button size="large" type="primary" @click="handleSearch" v-show="store.getters['user/getRightById'](15)">查询</el-button>
          <el-button size="large" type="success" @click="addDialogVisible = true" v-show="store.getters['user/getRightById'](16)">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <my-table :data="roles" :columns="columns" :operation-width="200">
      <template v-slot:userbtns="scope">
        <el-button size="mini" type="warning" @click="editRole(scope.row.id)" v-show="store.getters['user/getRightById'](17)">修改</el-button>
        <el-button size="mini" type="danger" @click="deleteRole(scope.row.id)" v-show="store.getters['user/getRightById'](18)">删除</el-button>
        <!-- :disabled="scope.row.roleName === '超级管理员'" -->
      </template>
    </my-table>
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
    <template #title>新增角色</template>
    <el-form :model="addForm">
      <el-form-item label="角色名称" label-position="top" prop="roleName" :rules="[{ required: true, message: '角色名称不能为空！', trigger: 'blur' }]">
        <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="权限列表" label-position="top">
        <my-rights-select v-model="addForm.rights" v-model:leaf-value="addForm.leafRights" v-model:half-checked-value="addForm.halfCheckedRights"></my-rights-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editDialogVisible" width="500px" @close="handleClose" destroy-on-close>
    <template #title>修改角色</template>
    <el-form :model="editForm">
      <el-form-item label="角色名称" label-position="top" prop="roleName" :rules="[{ required: true, message: '角色名称不能为空！', trigger: 'blur' }]">
        <el-input v-model="editForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="权限列表" label-position="top">
        <my-rights-select v-model="editForm.rights" v-model:leaf-value="editForm.leafRights" v-model:half-checked-value="editForm.halfCheckedRights" :current-role-id="editForm.id"></my-rights-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
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
  name: 'RoleManage',
  setup() {
    const store = useStore()
    const roles = ref([])
    const allRoles = ref([])
    const getAllRoles = async () => {
      const { data: res } = await service.post('backend/getAllRoles')
      allRoles.value = res.roles
      console.log(res.roles)
    }
    const handleSearch = () => {
      queryInfo.page = 1
      getRoles()
    }
    getAllRoles()
    let queryInfo = reactive({
      page: 1,
      limit: 10,
      roleId: ''
    })
    const count = ref(0)
    // const { data: res } = await service.post('login')
    const getRoles = async () => {
      try {
        const queryInfoCopy = {}
        queryInfoCopy.page = queryInfo.page
        queryInfoCopy.limit = queryInfo.limit
        if (queryInfo.roleId) {
          queryInfoCopy.roleId = queryInfo.roleId
        }
        const { data: res } = await service.post('backend/getRoleList', queryInfoCopy)
        roles.value = res.roles
        count.value = res.count
      } catch (e) {
        console.log(e)
      }
    }
    getRoles()
    const columns = [
      {
        title: '序号',
        prop: 'id'
      },
      { title: '角色', prop: 'roleName' }
    ]
    const editRole = async (id) => {
      editForm.id = id
      editForm.roleName = roles.value.find((item) => item.id == id).roleName
      const { data: res } = await service.post('backend/getRoleById', { id })
      editForm.rights = res.menus.split(',').map((item) => parseInt(item))
      editDialogVisible.value = true
    }
    const deleteRole = (id) => {
      ElMessageBox.confirm('是否删除该角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await service.post('backend/deleteRole', {
            id
          })
          if (res.status === 0) {
            ElMessage.success('删除成功')
          }
          if (roles.value.length === 1) {
            if (queryInfo.pagenum > 1) {
              queryInfo.pagenum--
            }
          }
          getRoles()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const handleSizeChange = (val) => {
      queryInfo.page = 1
      queryInfo.limit = val
      getRoles()
    }
    const handleCurrentChange = (val) => {
      queryInfo.page = val
      getRoles()
    }
    const currentPage = ref(1)
    const addDialogVisible = ref(false)
    const addForm = reactive({
      roleName: '',
      rights: [],
      leafRights: [],
      halfCheckedRights: []
    })
    const handleClose = () => {
      addForm.roleName = ''
      addForm.rights = []
      addForm.leafRights = []
      addForm.halfCheckedRights = []
      editForm.id = null
      editForm.roleName = ''
      editForm.rights = []
      editForm.leafRights = []
      editForm.halfCheckedRights = []
    }
    const handleAdd = () => {
      if (addForm.roleName.length === 0) {
        return ElMessage.error('角色名不能为空！')
      }
      if (addForm.halfCheckedRights.length === 0) {
        return ElMessage.error('角色不能没有任何权限！')
      }
      ElMessageBox.confirm('确定添加角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const addFormCopy = {}
          addFormCopy.roleName = addForm.roleName
          addFormCopy.rightIds = addForm.halfCheckedRights.join(',')
          console.log(addFormCopy.rightIds)
          // passwordFormCopy.id = passwordForm.id
          // passwordFormCopy.password = passwordForm.password
          const res = await service.post('backend/addRole', addFormCopy)
          if (res.status === 0) {
            ElMessage.success('添加成功！')
          }
          addDialogVisible.value = false
          getRoles()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消添加'
          })
        })
    }
    const editDialogVisible = ref(false)
    const editForm = reactive({
      id: null,
      roleName: '',
      rights: [],
      leafRights: [],
      halfCheckedRights: []
    })
    const handleEdit = () => {
      if (editForm.roleName.length === 0) {
        return ElMessage.error('角色名不能为空！')
      }
      if (editForm.halfCheckedRights.length === 0) {
        return ElMessage.error('角色不能没有任何权限！')
      }
      ElMessageBox.confirm('确定修改角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const editFormCopy = {}
          editFormCopy.id = editForm.id
          editFormCopy.roleName = editForm.roleName
          editFormCopy.rightIds = editForm.halfCheckedRights.join(',')
          console.log(editFormCopy.rightIds)
          // passwordFormCopy.id = passwordForm.id
          // passwordFormCopy.password = passwordForm.password
          const res = await service.post('backend/editRole', editFormCopy)
          if (res.status === 0) {
            ElMessage.success('修改成功！')
          }
          editDialogVisible.value = false
          getRoles()
          getAllRoles()
          store.dispatch('user/getMenus')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消修改'
          })
        })
    }
    watch(
      () => roles.value.length,
      () => {
        getAllRoles()
      }
    )
    return {
      roles,
      allRoles,
      queryInfo,
      handleSearch,
      count,
      getRoles,
      columns,
      editRole,
      deleteRole,
      currentPage,
      handleSizeChange,
      handleCurrentChange,
      addDialogVisible,
      addForm,
      handleClose,
      handleAdd,
      editDialogVisible,
      editForm,
      handleEdit,
      store
    }
  }
}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.el-select {
  // width: 300px;
  // flex: 1;
  width: 100%;
}
</style>
<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>账户管理</span>
      </div>
    </template>
    <el-form :model="queryInfo" label-position="left" label-width="60px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="账号" prop="username">
            <el-input v-model="queryInfo.username" placeholder="请输入管理员账号" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="queryInfo.name" placeholder="请输入管理员姓名" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工号" prop="number">
            <el-input v-model="queryInfo.number" placeholder="请输入管理员工号" size="large"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="queryInfo.phone" placeholder="请输入管理员手机号" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="queryInfo.roleId" placeholder="请选择" filterable>
              <el-option :label="请选择" value="" v-show="false"></el-option>
              <el-option v-for="item in allRoles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="large" type="primary" @click="handleSearch">查询</el-button>
          <el-button size="large" type="success" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <my-table :data="users" :columns="columns" operation-width="280px">
      <template v-slot:userbtns="scope">
        <el-button size="mini" type="primary" @click="editPassword(scope.row.id)">修改密码</el-button>
        <el-button size="mini" type="success" @click="editInfo(scope.row.id)">修改信息</el-button>
        <el-button v-if="scope.row.status == '正常'" size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
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
  <el-dialog v-model="addDialogVisible" width="500px" @close="handleAddClose" destroy-on-close>
    <template #title>新增账户</template>
    <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="80px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="addForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="number">
        <el-input v-model="addForm.number" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="currentEditId === null" :rules="passwordRules">
        <el-input v-model="addForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" v-if="currentEditId === null" :rules="confirmPasswordRules">
        <el-input v-model="addForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="addForm.roleId" placeholder="请选择角色" filterable multiple @click="addFormRef.validateField('roleId')">
          <el-option :label="请选择角色" value="" v-show="false"></el-option>
          <el-option v-for="item in allRoles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOrEdit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="passwordDialogVisible" width="500px" @close="handlePasswordClose" destroy-on-close>
    <template #title>修改密码</template>
    <el-form :model="passwordForm" ref="passwordFormRef" label-width="80px">
      <el-form-item label="新的密码" prop="password" :rules="passwordRules">
        <el-input v-model="passwordForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" :rules="confirmPasswordRules2">
        <el-input v-model="passwordForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePasswordChange">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive } from 'vue'
import service from '@/utils/request'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: 'UsersManage',
  setup() {
    const queryInfo = reactive({
      username: '',
      name: '',
      number: '',
      phone: '',
      roleId: '',
      pagenum: 1,
      pagesize: 10
    })
    const getUsers = async () => {
      const { data: res } = await service.post('getUsers', queryInfo)
      users.value = res.users
      count.value = res.count
    }
    const handleSearch = () => {
      queryInfo.pagenum = 1
      getUsers()
    }
    getUsers()
    const users = ref([])
    const columns = [
      {
        title: '序号',
        prop: 'id'
      },
      {
        title: '账号',
        prop: 'username'
      },
      {
        title: '角色',
        prop: 'roleName'
      },
      {
        title: '状态',
        prop: 'status'
      },
      {
        title: '姓名',
        prop: 'name'
      },
      {
        title: '工号',
        prop: 'number'
      },
      {
        title: '手机号',
        prop: 'phone'
      }
    ]
    const allRoles = ref([])
    const getAllRoles = async () => {
      const { data: res } = await service.post('getAllRoles')
      allRoles.value = res.roles
      console.log(res.roles)
    }
    getAllRoles()
    const editPassword = (id) => {
      passwordForm.id = id
      passwordDialogVisible.value = true
    }
    const editInfo = async (id) => {
      currentEditId.value = id
      const { data: res } = await service.post('getAdminById', {
        id
      })
      const user = res
      addForm.username = user.username
      addForm.name = user.name
      addForm.number = user.number
      addForm.phone = user.phone
      addForm.roleId = user.roleId
      addDialogVisible.value = true
    }
    const deleteUser = (id) => {
      ElMessageBox.confirm('是否删除该账户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await service.post('deleteAdmin', {
            id
          })
          if (res.status === 0) {
            ElMessage.success('删除成功')
          }
          if (users.value.length === 1) {
            if (queryInfo.pagenum > 1) {
              queryInfo.pagenum--
            }
          }
          getUsers()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const count = ref(0)
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getUsers()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getUsers()
    }
    const addFormRef = ref(null)
    const addForm = reactive({
      username: '',
      name: '',
      number: '',
      phone: '',
      password: '',
      confirmPassword: '',
      roleId: ''
    })
    const addFormRules = {
      username: [
        {
          required: true,
          message: '请输入账号！',
          trigger: 'blur'
        },
        {
          validator: (rule, value, callback) => {
            if (!/^\w*$/.test(value)) {
              callback(new Error('账户名称不合法！'))
            } else {
              callback()
            }
          },
          message: '账户名称不合法！',
          trigger: 'blur'
        }
      ],
      // password: passwordRules,
      // confirmPassword: confirmPasswordRules,
      roleId: [
        {
          required: true,
          message: '请选择角色！',
          trigger: ['blur', 'change']
        }
      ]
    }

    const addDialogVisible = ref(false)
    const handleAddClose = () => {
      addForm.username = ''
      addForm.name = ''
      addForm.number = ''
      addForm.phone = ''
      addForm.password = ''
      addForm.confirmPassword = ''
      addForm.roleId = []
      currentEditId.value = null
    }
    const handleAdd = () => {
      addFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm('确定添加账户吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const formCopy = {}
              formCopy.username = addForm.username
              formCopy.name = addForm.username
              formCopy.number = addForm.number
              formCopy.phone = addForm.phone
              formCopy.password = addForm.password
              // formCopy.confirmPassword = addForm.confirmPassword
              formCopy.roleId = addForm.roleId.join(',')
              const res = await service.post('addAdmin', formCopy)
              if (res.status === 0) {
                ElMessage.success('添加成功')
              }
              addDialogVisible.value = false
              getUsers()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消添加'
              })
            })
        } else {
          return false
        }
      })
    }
    const handleEdit = () => {
      addFormRef.value.validate((valid) => {
        console.log(valid)
        if (valid) {
          ElMessageBox.confirm('确定修改账户吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const formCopy = {}
              formCopy.id = currentEditId.value
              formCopy.username = addForm.username
              formCopy.name = addForm.username
              formCopy.number = addForm.number
              formCopy.phone = addForm.phone
              formCopy.roleId = addForm.roleId.join(',')
              const res = await service.post('editAdmin', formCopy)
              if (res.status === 0) {
                ElMessage.success('修改成功')
              }
              addDialogVisible.value = false
              getUsers()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          return false
        }
      })
    }
    const handleAddOrEdit = () => {
      if (currentEditId.value !== null) {
        handleEdit()
      } else {
        handleAdd()
      }
    }
    const currentEditId = ref(null)
    const passwordDialogVisible = ref(false)
    const passwordForm = reactive({
      id: null,
      password: '',
      confirmPassword: ''
    })
    const handlePasswordClose = () => {
      passwordForm.id = null
      passwordForm.password = ''
      passwordForm.confirmPassword = ''
    }
    const passwordFormRef = ref(null)
    const handlePasswordChange = () => {
      passwordFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm('确定修改密码吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const passwordFormCopy = {}
              passwordFormCopy.id = passwordForm.id
              passwordFormCopy.password = passwordForm.password
              const res = await service.post('editPassword', passwordFormCopy)
              if (res.status === 0) {
                ElMessage.success('修改成功')
              }
              passwordDialogVisible.value = false
              getUsers()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          return false
        }
      })
    }
    const passwordRules = [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位！'))
          } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[1-9]/.test(value)) {
            callback(new Error('密码必须包含大写字母小写字母和数字！'))
          } else if (!/^\w*$/.test(value)) {
            callback(new Error('密码只能包含数字字母下划线！'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
    const confirmPasswordRules = [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位！'))
          } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[1-9]/.test(value)) {
            callback(new Error('密码必须包含大写字母小写字母和数字！'))
          } else if (!/^\w*$/.test(value)) {
            callback(new Error('密码只能包含数字字母下划线！'))
          } else if (value !== addForm.password) {
            callback('两次输入密码不一致！')
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
    // 用于修改密码时的确认密码校验
    const confirmPasswordRules2 = [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位！'))
          } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[1-9]/.test(value)) {
            callback(new Error('密码必须包含大写字母小写字母和数字！'))
          } else if (!/^\w*$/.test(value)) {
            callback(new Error('密码只能包含数字字母下划线！'))
          } else if (value !== passwordForm.password) {
            callback('两次输入密码不一致！')
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
    return {
      queryInfo,
      handleSearch,
      columns,
      users,
      allRoles,
      editPassword,
      editInfo,
      deleteUser,
      count,
      handleSizeChange,
      handleCurrentChange,
      addForm,
      addFormRef,
      addFormRules,
      addDialogVisible,
      handleAddClose,
      handleAddOrEdit,
      currentEditId,
      passwordDialogVisible,
      passwordForm,
      handlePasswordClose,
      passwordFormRef,
      handlePasswordChange,
      passwordRules,
      confirmPasswordRules,
      confirmPasswordRules2
    }
  }
}
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
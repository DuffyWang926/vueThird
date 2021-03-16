<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>权限管理</span>
      </div>
    </template>
    <el-form :model="queryInfo">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="角色">
            <el-select
              v-model="queryInfo.roleId"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button size="medium" type="primary">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="medium" type="success">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <my-table :data="roles" :columns="columns" :operation-width="200">
      <template v-slot:userbtns="scope">
        <el-button
          size="mini"
          type="warning"
          @click="editRole(scope.row.id)"
          :disabled="scope.row.id === 1"
          >修改</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="deleteRole(scope.row.id)"
          :disabled="scope.row.id === 1"
          >删除</el-button
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
</template>

<script>
import { ref, reactive } from 'vue'
import service from '@/utils/request'
export default {
  name: 'RoleManage',
  setup() {
    let roles = ref([])
    let queryInfo = reactive({
      pagenum: 1,
      pagesize: 10,
      roleId: ''
    })
    let count = ref(0)
    // const { data: res } = await service.get('login')
    let getRoles = async () => {
      try {
        const { data: res } = await service.get('roles', { params: queryInfo })
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
    const editRole = (id) => {}
    const deleteRole = (id) => {}
    const handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getRoles()
    }
    const handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getRoles()
    }
    const currentPage = ref(1)
    return {
      roles,
      queryInfo,
      count,
      getRoles,
      columns,
      editRole,
      deleteRole,
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
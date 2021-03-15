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
            <el-select v-model="queryInfo.roleId">
              <el-option
                v-for="item in roles.value"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-button>查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button>新增</el-button>
        </el-col>
        <my-table :data="roles.value" :columns="columns" :operation-width="200">
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
          v-model:currentPage="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, sizes, jumper"
          :total="count"
          background
        >
        </el-pagination>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { reactive } from 'vue'
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
    let getRoles = async () => {
      const { data: res } = await service.get('roles', queryInfo)
      console.log(res.data)
      roles.value = res.data.roles
      count.value = res.data.count
    }
    getRoles()
    editRole = (id) => {}
    deleteRole = (id) => {}
    handleSizeChange = (val) => {
      queryInfo.pagenum = 1
      queryInfo.pagesize = val
      getRoles()
    }
    handleCurrentChange = (val) => {
      queryInfo.pagenum = val
      getRoles()
    }
    return {
      roles,
      queryInfo,
      count,
      getRoles
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
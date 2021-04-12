<template>
  <el-card>
    <template #header>
      <div class="card-header">规则政策列表</div>
    </template>
   <my-table
        :data="rulesMenu"
        :columns="columns"
        :operation-width="200"
        
        >
        <!-- <template v-slot:userbtns="scope">
            <el-button type="warning" size="medium" @click="editHotWord(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="medium" @click="deleteHotWord(scope.row.id)">删除</el-button>
        </template> -->
    </my-table>
  </el-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/utils/request'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: "list",
  setup() {
    const $router = useRouter()
    const columns = [
      {
        title: '编号',
        prop: 'id'
      },
      {
        title: '规则政策',
        prop: 'ruleName'
      }
    ]
    const rulesMenu = ref([])

    return {
        columns,
        rulesMenu
    }
  }
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#4e73df;
    font-weight: bold;
}
</style>

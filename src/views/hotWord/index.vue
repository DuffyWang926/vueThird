<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">热搜词管理</div>
        </template>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="名称" >
                <el-input size="medium" placeholder="请输入名称" v-model="queryInfo.hotWordName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="success" @click="handleSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="warning" @click="handleAddDia = true">新增</el-button>
            </el-form-item>
        </el-form>
        <my-table
            :data="hotWordInfo"
            :columns="columns"
            :operation-width="200"
            >
            <template v-slot:userbtns="scope">
                <el-button type="warning" size="medium" @click="editHotWord(scope.row.id)">编辑</el-button>
                <el-button type="danger" size="medium" @click="deleteHotWord(scope.row.id)">删除</el-button>
            </template>
        </my-table>
        <el-pagination
            @size-change= "handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            background
            >
        </el-pagination>
        <el-dialog v-model="handleAddDia" width="500px">
            <template #title>
                 <div class="card-header">新增/编辑</div>
            </template>
            <el-form label-position="left" label-width="80px" :model="addForm" ref="addFormRef">
                <el-form-item label="名称" required="true" >
                    <el-input size="medium" placeholder="请输入名称" v-model="addForm.hotWordName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="addFooter">
                    <el-button @click="addSubmit" type="primary" size="medium">保存</el-button>
                    <el-button @click="handleAddDia = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="handleEditDia" width="500px">
            <template #title>
                <div class="card-header">新增/编辑</div>
            </template>
            <el-form label-position="left" label-width="80px" :model="addForm" ref="addFormRef">
                <el-form-item label="名称" required="true" >
                    <el-input size="medium" placeholder="请输入名称" v-model="addForm.hotWordName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="addFooter">
                    <el-button @click="editSubmit" type="primary" size="medium">保存</el-button>
                    <el-button @click="handleEditDia = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/utils/request'
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: "hotWord",
  setup() {
      const $router = useRouter()
      const queryInfo = reactive({
          hotWordName: '',
          pagenum: 1,
          pagesize: 10
      })
      const addForm = reactive({
          id: '',
          hotWordName: ''
      })
      const columns = [
          {
              title: '编号',
              prop: 'id'
          },
          {
              title: '名称',
              prop: 'hotWordName'
          }
      ]
      const handleAddDia = ref(false)
      const handleEditDia = ref(false)
      const addFormRef = ref(null)
      const hotWordInfo = ref([])
      const count = ref(0)
      const currentPage = ref(1)
      const getHotWordInfo = async () => {
          try {
              const { data: res } = await service.get('getHotWord', {
                  params: queryInfo
              })
              console.log(res)
              hotWordInfo.value = res.hotWordInfo
              count.value = res.count
          } catch (err) {
              console.log(err)
          }
      }
      getHotWordInfo()
      const handleSizeChange = (val) => {
          queryInfo.pagenum = 1
          queryInfo.pagesize = val
          getHotWordInfo()
      }
      const handleCurrentChange = (val) => {
          queryInfo.pagenum = val
          getHotWordInfo()
      }
      const matchHotWord = async () => {
          const { data: res } = await service.get('matchHotWord', {
              params: queryInfo
          })
          console.log(res)
          hotWordInfo.value = res.matchHotWordInfo
          count.value = res.count
      }
      const handleSubmit = () => {
          queryInfo.pagenum = 1
          matchHotWord()
      }
      const addSubmit = (val) => {
          addFormRef.value.validate( async(valid) => {
              console.log(val)
              if(valid) {
                  const res = await service.post('addHotName', addForm)
                  if(res.status == 0) {
                       ElMessage.success('添加成功')
                  }
                  handleAddDia.value = false
                  clearAddOrEdit()
              } else {
                  ElMessage.error('添加失败！')
                  return false
              }
         })
      }
      const clearAddOrEdit = () => {
          addForm.hotWordName = ''
      }
      const editHotWord = async (id) => {
          const { data : res} = await service.post('editHotNameById', {
              id
          })
          const resInfo = res
          console.log(resInfo)
          addForm.hotWordName = resInfo.hotWordName
          addForm.id = resInfo.id
          handleEditDia.value = true
      }
      const editSubmit = (val) => {
          addFormRef.value.validate( async(valid) => {
              console.log(val)
              if(valid) {
                  const res = await service.post('editHotWord', addForm)
                  if(res.status == 0) {
                      ElMessage.success('修改成功')
                  }
                  handleEditDia.value = false
                  clearAddOrEdit()
              } else {
                  ElMessage.error('修改失败')
                  return false
              }
          })
      }
      const deleteHotWord = (id) => {
          ElMessageBox.confirm('确定删除该热搜词吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          })
          .then(async () => {
              console.log(id)
              const res = await service.post('deleteHotWord', {id})
              if (res.status == 0) {
                  ElMessage.success('删除成功')
                  getHotWordInfo()
              }
          })
          .catch(() => {
              ElMessage({
                  type: 'info',
                  message: '已取消删除'
              })
          })
      }
      return {
          queryInfo,
          hotWordInfo,
          columns,
          count,
          handleSizeChange,
          handleCurrentChange,
          currentPage,
          handleSubmit,
          handleAddDia,
          addForm,
          addFormRef,
          handleEditDia,
          editHotWord,
          editSubmit,
          addSubmit,
          deleteHotWord
      }
  }
}
</script>

<style scoped>
    .card-header {
        color:#4e73df;
        font-weight: bold;
    }
    .demo-form-inline {
        color:#858796;
        border-bottom: 1px solid #e3e6f0;
    }
    .el-pagination{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin:20px 0;
    }
    .addFooter {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>

<template>
  <div class="container">
    <my-table
      :data="state.tableData"
      :columns="state.columns"
      :operation-width="350"
      @preview="handlePreview"
      switch-show
      switch-prop="on"
      edit-show
      delete-show
      selection-show
      v-model:selected="selected"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template v-slot:userbtns="scope">
        <el-button size="mini" type="warning">{{ scope.row.id }}</el-button>
      </template>
    </my-table>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  name: 'MyTableTest',
  setup() {
    const state = reactive({
      columns: [
        {
          title: '语文',
          prop: 'chinese',
          width: 300
        },
        {
          title: '数学',
          prop: 'math',
          width: 400
        },
        {
          title: '英语',
          prop: 'english'
        },
        {
          title: '英语',
          prop: 'english'
        },
        {
          title: '英语',
          prop: 'english'
        },
        {
          title: '英语',
          prop: 'english'
        }
      ],
      tableData: [
        {
          id: 1,
          chinese: 99,
          math: 80,
          english: 60,
          on: true
        },
        {
          id: 2,
          chinese: 66,
          math: 89,
          english: 60,
          on: false
        },
        {
          id: 3,
          chinese: 88,
          math: 67,
          english: 89,
          on: true
        }
      ]
    })
    const handlePreview = (id) => {
      alert(id)
    }
    const handleEdit = (id) => {
      state.tableData.find((item) => item.id === id).math = Math.floor(
        Math.random() * 101
      )
    }
    const handleDelete = (id) => {
      state.tableData.splice(
        state.tableData.findIndex((item) => item.id === id),
        1
      )
    }
    const selected = ref([])
    return {
      state,
      handlePreview,
      handleEdit,
      handleDelete,
      selected
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>

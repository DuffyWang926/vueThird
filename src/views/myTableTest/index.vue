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
    <!-- <el-form :model="state.ruleForm" status-icon ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="state.ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="state.ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form> -->
    <!-- <input type="text" v-model="a" /> <span>{{ a }}</span> -->
    <!-- <el-collapse-transition>
      <div class="transition-box" v-show="show3">el-collapse-transition</div>
      <div class="transition-box" v-show="show3">el-collapse-transition</div>
      <div class="transition-box" v-show="show3">el-collapse-transition</div>
    </el-collapse-transition> -->
    <!-- <div id="demo">
      <transition name="mode-fade">
        <button v-if="on" key="on" @click="on = false">on</button>
        <button v-else key="off" @click="on = true">off</button>
      </transition>
    </div> -->
    <!-- <el-button @click="show3 = !show3">Click Me</el-button> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-model:currentPage="currentPage"
      :page-size="100"
      layout="total, prev, pager, next, sizes, jumper"
      :total="400"
    >
    </el-pagination>
    <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"> </el-tree>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
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
      ],
      ruleForm: {
        pass: '',
        age: ''
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    })
    const ruleFormRef = ref(null)
    const handlePreview = (id) => {
      alert(id)
    }
    const handleEdit = (id) => {
      state.tableData.find((item) => item.id === id).math = Math.floor(Math.random() * 101)
    }
    const handleDelete = (id) => {
      state.tableData.splice(
        state.tableData.findIndex((item) => item.id === id),
        1
      )
    }
    const submitForm = () => {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetForm = () => {
      ruleFormRef.value.resetFields()
    }
    const repositories = ref([])
    console.log(repositories.value)
    repositories.value.push(0)
    console.log(repositories.value)
    const a = ref('')

    const selected = ref([])
    return {
      state,
      ruleFormRef,
      handlePreview,
      handleEdit,
      handleDelete,
      submitForm,
      resetForm,
      show3: ref(true),
      a,
      on: ref(true),
      currentPage: ref(1),
      selected
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
</style>

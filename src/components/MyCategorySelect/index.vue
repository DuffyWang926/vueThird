<template>
  <div class="my-category-select">
    <el-input
      :model-value="categoryNameSelectedList"
      @focus="emit('update:showFlag', true)"
      @click.stop="emit('update:showFlag', true)"
      :placeholder="loading ? '加载中' : '请点击选择'"
    ></el-input>
    <div
      class="tree-container"
      v-loading="categoryTreeLoading"
      v-show="showFlag"
      :tabindex="1"
      @blur="emit('update:showFlag', false)"
      @click.stop="emit('update:showFlag', true)"
    >
      <el-tree
        v-if="categoryList.length > 0"
        :data="data"
        ref="categoryTreeRef"
        :props="categoryTreeProps"
        :filter-node-method="categoryFilterNode"
        show-checkbox
        node-key="id"
        @check-change="handleCheckChange"
        @check="handleCheck"
        default-expand-all
        accordion
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'MyCategorySelect',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    showFlag: {
      type: Boolean,
      required: true,
      default: true
    },
    singleValue: {
      type: String,
      required: false,
      default: ''
    },
    leafValue: {
      type: Array,
      required: false,
      default: () => []
    },
    isThreeCategory: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const loading = ref(true)
    const categoryList = ref([])
    const data = ref([])
    let date = +new Date()
    const getAllCategoryList = async () => {
      const { data: res } = await service.get('getAllCategoryTree')
      console.log(res)
      categoryList.value = res.categoryList
      data.value = generateNodes()
      console.log('请求所有分类项', +new Date() - date)
      date = +new Date()
      await nextTick()
      console.log('加载分类树', +new Date() - date)
      date = +new Date()
      console.log(categoryTreeRef.value)
      const nodes = categoryTreeRef.value.store.nodesMap
      for (var i in nodes) {
        nodes[i].collapse()
      }
      console.log('收起分类树', +new Date() - date)
      date = +new Date()
      loading.value = false
      categoryTreeRef.value.setCheckedKeys(props.modelValue, false)
    }
    getAllCategoryList()
    console.log(categoryList.value)
    const categoryTreeRef = ref(null)
    const categoryTreeProps = {
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }
    const categoryFilterText = ref('')
    const categoryTreeLoading = ref(false)
    const categoryFilterNode = (value, data) => {
      if (!value) return true
      const flag = data.name.indexOf(value) !== -1
      return flag
    }
    const generateNodes = () => {
      const root = {
        id: 0,
        name: '全部商品',
        leaf: false,
        parent: null
        // children: []
      }
      getChildren(root)
      function getChildren(data) {
        data.children = []
        categoryList.value.forEach((item) => {
          if (item.pid == data.id) {
            data.children.push(item)
            item.parent = data
          }
        })
        if (data.children.length > 0) {
          data.leaf = false
          data.children.forEach((item) => {
            getChildren(item)
          })
        } else {
          data.leaf = true
        }
      }
      return root.children
    }
    const loadCategoryNode = (node, resolve) => {
      // console.log(node)
      // if (node.level === 0) {
      //   return resolve(
      //     categoryList.value
      //       .filter((item) => item.pid == 0)
      //       .map((item) => {
      //         return {
      //           id: item.id,
      //           name: item.name,
      //           leaf: categoryList.value.every(
      //             (childItem) => childItem.pid != item.id
      //           ),
      //           disabled: props.isThreeCategory
      //         }
      //       })
      //   )
      // }
      // const data = categoryList.value
      //   .filter((item) => item.pid === node.data.id)
      //   .map((item) => {
      //     return {
      //       id: item.id,
      //       name: item.name,
      //       leaf: !categoryList.value.some(
      //         (childItem) => childItem.pid === item.id
      //       ),
      //       disabled: props.isThreeCategory
      //         ? categoryList.value.some(
      //             (childItem) => childItem.pid == item.id
      //           ) || node.level !== 2
      //         : false
      //     }
      //   })
      // resolve(data)
    }
    const categoryNameSelectedList = computed(() => {
      const filtered = []
      props.modelValue.forEach((id) => {
        if (categoryList.value.length > 0) {
          const item = categoryList.value.find((item) => item.id == id)
          if (props.modelValue.indexOf(item.pid) === -1) {
            filtered.push(item)
          }
        }
      })
      return filtered.map((item) => item.name).join(',')
    })
    // const getCategoryIdSelectedList = () => {
    //   const filtered = []
    //   props.modelValue.forEach((id) => {
    //     if (categoryList.value.length > 0) {
    //       const item = categoryList.value.find((item) => item.id == id)
    //       if (props.modelValue.indexOf(item.pid) === -1) {
    //         filtered.push(item)
    //       }
    //     }
    //   })
    //   return filtered.map((item) => item.id)
    // }
    const handleCheckChange = () => {
      console.log('handleCheckChange')
      const keys = categoryTreeRef.value.getCheckedKeys()
      emit('update:modelValue', keys)
      keys.forEach((id) => {
        const pid = categoryList.value.find((item) => item.id === id).pid
        if (!keys.some((item) => item == pid)) {
          return emit('update:singleValue', id)
        }
      })
      emit('update:leafValue', categoryTreeRef.value.getCheckedKeys(true))
    }
    const handleCheck = (data, {}) => {
      console.log('handleCheck')
      if (!props.multiple) {
        categoryTreeRef.value.setCheckedKeys([data.id])
        emit('update:showFlag', false)
      }
      // console.log('handleCheckChange', getCategoryIdSelectedList())
      // emit('update:modelValue', getCategoryIdSelectedList())
    }
    return {
      data,
      loading,
      categoryList,
      categoryTreeRef,
      categoryTreeProps,
      categoryFilterText,
      categoryFilterNode,
      loadCategoryNode,
      handleCheckChange,
      categoryTreeLoading,
      categoryNameSelectedList,
      // categoryIdSelectedList,
      handleCheck,
      emit
    }
  }
}
</script>

<style scoped lang="scss">
.my-category-select {
  position: relative;
  .tree-container {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    height: 600px;
    z-index: 10;
    overflow: auto;
    .el-tree {
      background-color: #eee;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
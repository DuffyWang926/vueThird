<template>
  <div class="tree-container" v-loading="goodsTreeLoading">
    <el-input type="textarea" :rows="3" placeholder="此处展示所选商品列表" :model-value="goodsNameSelectedList" disabled resize="none" v-if="onlyOneProduct == false"> </el-input>
    <el-input placeholder="输入关键字进行过滤" v-model="goodsFilterText"></el-input>
    <el-tree :data="data" ref="goodsTreeRef" :props="goodsTreeProps" :filter-node-method="goodsFilterNode" show-checkbox node-key="id" @check-change="handleGoodsCheckChange" @check="handleCheck">
      <template #default="{ node, data }">
        <span class="custom-tree-node" :class="[data.level < 4 ? 'no-checkbox' : '']">
          <span>{{ data.name }}</span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script>
import service from '@/utils/request'
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'MyGoodsSelect',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    textareaShow: {
      type: Boolean,
      required: false,
      default: false
    },
    isRestrictRegion: {
      type: Boolean,
      required: false,
      default: false
    },
    leafValue: {
      type: Array,
      required: false,
      default: () => []
    },
    onlyOneProduct: {
      type: Boolean,
      required: false,
      default: false
    },
    productId: {
      type: [Number, String],
      required: false,
      default: null
    },
    subProductIds: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const goodsList = ref([])
    const goodsTreeLoading = ref(false)
    const data = ref([])
    const getAllGoodsList = async () => {
      let date = +new Date()
      goodsTreeLoading.value = true
      const { data: res } = await service.get('backend/getAllCategory')
      console.log(res)
      goodsList.value = res
      if (!goodsList.value.find((item) => item.id == 0)) {
        goodsList.value.push({
          id: '0',
          name: '选择全部商品',
          subId: null,
          leaf: false
        })
      }
      console.log('请求所有商品项', +new Date() - date)
      date = +new Date()
      data.value = generateNodes()
      goodsTreeLoading.value = false
      await nextTick()
      console.log('加载商品项', +new Date() - date)
      date = +new Date()
      const nodes = goodsTreeRef.value.store.nodesMap
      for (var i in nodes) {
        nodes[i].collapse()
      }
      console.log('收起商品项', +new Date() - date)
      date = +new Date()
      goodsTreeRef.value.setCheckedKeys(props.modelValue, false)
    }
    getAllGoodsList()
    console.log(goodsList.value)
    const goodsTreeRef = ref([])
    const goodsTreeProps = {
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }
    const goodsFilterText = ref('')
    const goodsFilterNode = (value, data) => {
      if (!value) return true
      for (let current = data; current !== null; current = current.parent) {
        const flag = current.name.indexOf(value) !== -1
        if (flag) {
          return true
        }
      }
      return false
    }
    const generateNodes = () => {
      const root = {
        id: 0,
        name: '全部商品',
        leaf: false,
        parent: null,
        level: 0
        // children: []
      }
      if (props.onlyOneProduct) {
        root.disabled = true
      }
      getChildren(root)
      function getChildren(data) {
        data.children = []
        goodsList.value.forEach((item) => {
          if (item.subId == data.id) {
            data.children.push(item)
            item.parent = data
            item.level = data.level + 1
            if (item.level == 5) {
              if (item.colour && item.size) {
                item.name = [item.colour, item.size].join(';')
              }
            }
            let disabled = false
            if (props.onlyOneProduct) {
              if (item.level < 4) {
                disabled = true
              }
            }
            item.disabled = disabled
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
      return [root]
    }
    const goodsNameSelectedList = computed(() => {
      const filtered = []
      props.modelValue.forEach((id) => {
        if (goodsList.value.length > 0) {
          const item = goodsList.value.find((item) => item.id == id + '')
          if (props.modelValue.indexOf(item.subId) === -1) {
            filtered.push(item)
          }
        }
      })
      return filtered.map((item) => item.name).join(',')
    })
    let goodsFilterTimer = null
    let emitTimer = null
    const parseProductId = (id) => {
      if (String(id).indexOf('P') !== -1 || String(id).indexOf('p') !== -1) {
        return parseInt(String(id).slice(2))
      } else {
        return id
      }
    }
    const parseSubProductId = (id) => {
      if (String(id).indexOf('I') !== -1 || String(id).indexOf('i') !== -1) {
        return parseInt(String(id).slice(2))
      } else {
        return id
      }
    }
    const handleGoodsCheckChange = () => {
      clearTimeout(emitTimer)
      emitTimer = setTimeout(() => {
        emit('update:modelValue', goodsTreeRef.value.getCheckedKeys())
        emit('update:leafValue', goodsTreeRef.value.getCheckedKeys(true))
        emit('update:productId', parseProductId(goodsTreeRef.value.getCheckedNodes(false, true).filter((item) => item.level == 4)[0].id))
        emit(
          'update:subProductIds',
          goodsTreeRef.value
            .getCheckedNodes()
            .filter((item) => item.level == 5)
            .map((item) => item.id)
            .map(parseSubProductId)
        )
      }, 100)
    }
    const handleCheck = (data, {}) => {
      // console.log(data)
      if (data.id === '0') {
        if (!props.isRestrictRegion) return
        ElMessageBox.confirm('是否限售所有商品？添加该规则后，后续上架的产品也将延续该规则！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            goodsTreeRef.value.setChecked(data.id, true)
          })
          .catch(() => {
            goodsTreeRef.value.setChecked(data.id, false)
          })
      }
      if (props.onlyOneProduct) {
        const checkedNodes = goodsTreeRef.value.getCheckedNodes(false, true)
        console.log(checkedNodes)
        if (checkedNodes.filter((item) => item.level == 4).length > 1) {
          goodsTreeRef.value.setCheckedKeys([data.id])
        }
      }
    }
    watch(goodsFilterText, (newValue) => {
      const nodes = goodsTreeRef.value.store.nodesMap
      if (newValue === '') {
        goodsTreeRef.value.filter(newValue)
        goodsTreeLoading.value = false
        for (var i in nodes) {
          nodes[i].collapse()
        }
        clearTimeout(goodsFilterTimer)
        return
      }
      clearTimeout(goodsFilterTimer)
      goodsFilterTimer = setTimeout(() => {
        for (var i in nodes) {
          nodes[i].collapse()
        }
        goodsTreeLoading.value = true
        setTimeout(() => {
          goodsTreeRef.value.filter(newValue)
          goodsTreeLoading.value = false
        }, 500)
      }, 1500)
    })
    watch(
      () => props.modelValue,
      () => {
        goodsTreeRef.value.setCheckedKeys(props.modelValue)
      }
    )
    return {
      data,
      goodsList,
      goodsTreeRef,
      goodsTreeProps,
      goodsFilterText,
      goodsFilterNode,
      handleGoodsCheckChange,
      goodsTreeLoading,
      goodsNameSelectedList,
      handleCheck
    }
  }
}
</script>

<style scoped lang="scss">
.el-input,
.el-textarea {
  margin-bottom: 20px;
}
.tree-container {
  width: 100%;
  .el-tree {
    width: 100%;
    overflow: auto;
  }
}
// .custom-tree-node + .el-checkbox {
//   display: none;
// }
</style>
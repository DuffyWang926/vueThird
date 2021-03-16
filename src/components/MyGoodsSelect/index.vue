<template>
  <div class="tree-container" v-loading="goodsTreeLoading">
    <el-input
      type="textarea"
      :rows="3"
      placeholder="此处展示所选商品列表"
      :model-value="goodsNameSelectedList"
      disabled
      resize="none"
    >
    </el-input>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="goodsFilterText"
    ></el-input>
    <el-tree
      ref="goodsTreeRef"
      :props="goodsTreeProps"
      :filter-node-method="goodsFilterNode"
      :load="loadGoodsNode"
      lazy
      show-checkbox
      node-key="id"
      @check-change="handleGoodsCheckChange"
      @check="handleCheck"
    >
    </el-tree>
  </div>
</template>

<script>
import service from '@/utils/request'
import { ref, computed, watch } from 'vue'
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
    }
  },
  setup(props, { emit }) {
    const goodsList = ref([])
    const getAllGoodsList = async () => {
      const { data: res } = await service.get('getAllGoods')
      console.log(res)
      goodsList.value = res.goodsList
      goodsList.value.push({
        id: '0',
        name: '选择全部商品',
        leaf: false
      })
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
    const goodsTreeLoading = ref(false)
    const goodsFilterNode = (value, data) => {
      if (!value) return true
      const flag = data.name.indexOf(value) !== -1
      return flag
    }
    const loadGoodsNode = (node, resolve) => {
      if (node.level === 0) {
        return resolve([
          {
            id: '0',
            name: '全部商品',
            leaf: false
          }
        ])
      }
      console.log(node)
      const data = goodsList.value
        .filter((item) => item.pid === node.data.id)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            leaf: !goodsList.value.some(
              (childItem) => childItem.pid === item.id
            )
          }
        })
      resolve(data)
    }
    const goodsNameSelectedList = computed(() => {
      const filtered = []
      props.modelValue.forEach((id) => {
        const item = goodsList.value.find((item) => item.id === id)
        if (props.modelValue.indexOf(item.pid) === -1) {
          filtered.push(item)
        }
      })
      return filtered.map((item) => item.name).join(',')
    })
    let goodsFilterTimer = null
    const handleGoodsCheckChange = () => {
      emit('update:modelValue', goodsTreeRef.value.getCheckedKeys())
    }
    const handleCheck = (data, {}) => {
      console.log(data)
      if (data.id === '0') {
        if (!props.isRestrictRegion) return
        ElMessageBox.confirm(
          '是否限售所有商品？添加该规则后，后续上架的产品也将延续该规则！',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            goodsTreeRef.value.setChecked(data.id, true)
          })
          .catch(() => {
            goodsTreeRef.value.setChecked(data.id, false)
          })
      }
    }
    watch(goodsFilterText, (newValue) => {
      goodsTreeLoading.value = true
      const nodes = goodsTreeRef.value.store.nodesMap
      for (var i in nodes) {
        nodes[i].collapse()
      }
      if (newValue === '') {
        goodsTreeRef.value.filter(newValue)
        goodsTreeLoading.value = false
        return
      }
      clearTimeout(goodsFilterTimer)
      goodsFilterTimer = setTimeout(() => {
        const matchedGoods = goodsList.value.filter(
          (item) => item.name.indexOf(newValue) !== -1
        )
        for (let i = 0; i < matchedGoods.length; i++) {
          const item = matchedGoods[i]
          // console.log(item)
          if (
            goodsTreeRef.value.store.nodesMap[item] &&
            goodsTreeRef.value.store.nodesMap[item].expanded === true
          ) {
            continue
          }
          const nodesArr = []
          let current = item
          nodesArr.push(item)
          while (
            (current = goodsList.value.find(
              (item) => item.id === current.pid
            )) != null
          ) {
            nodesArr.push(current)
          }
          nodesArr.reverse()
          console.log(nodesArr)
          nodesArr.forEach((item) => {
            const nodes = goodsTreeRef.value.store.nodesMap
            console.log(goodsTreeRef.value.store.nodesMap)
            for (var i in nodes) {
              if (nodes[i].data.id === item.id) {
                // loadRegionNode(nodes[i], regionTreeResolve)
                // nodes[i].expanded = true
                nodes[i].expand()
                break
              }
            }
          })
        }
        setTimeout(() => {
          goodsTreeRef.value.filter(newValue)
          goodsTreeLoading.value = false
        }, 1000)
      }, 500)
    })
    return {
      goodsList,
      goodsTreeRef,
      goodsTreeProps,
      goodsFilterText,
      goodsFilterNode,
      loadGoodsNode,
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
  height: 400px;
  .el-tree {
    width: 500px;
    height: 500px;
    overflow: auto;
  }
}
</style>
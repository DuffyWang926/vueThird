<template>
  <div class="tree-container" v-loading="rightsTreeLoading">
    <el-input
      type="textarea"
      :rows="3"
      placeholder="此处展示所选权限列表"
      :model-value="rightsNameSelectedList"
      disabled
      resize="none"
    >
    </el-input>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="rightsFilterText"
    ></el-input>
    <el-tree
      v-if="rightsList.length > 0"
      v-show="!rightsTreeLoading"
      ref="rightsTreeRef"
      :props="rightsTreeProps"
      :filter-node-method="rightsFilterNode"
      :load="loadRightsNode"
      lazy
      show-checkbox
      node-key="id"
      @check-change="handleRightsCheckChange"
      @check="handleCheck"
      default-expand-all
    >
    </el-tree>
  </div>
</template>

<script>
import service from '@/utils/request'
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'MyRightsSelect',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    leafValue: {
      type: Array,
      required: false,
      default: () => []
    },
    halfCheckedValue: {
      type: Array,
      required: false,
      default: () => []
    },
    currentRoleId: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props, { emit }) {
    const rightsList = ref([])
    const rightsTreeLoading = ref(false)
    const getAllRightsList = async () => {
      rightsTreeLoading.value = true
      let date = +new Date()
      let { data: res } = await service.post('getAllMenu')
      console.log(res)
      console.log('请求所有菜单项', +new Date() - date)
      date = +new Date()

      rightsList.value = res.menus
      await nextTick()
      console.log('渲染列表', +new Date() - date)
      date = +new Date()
      // // 测试
      // console.log('测试')
      // const tree = rightsTreeRef.value
      // console.log(tree)
      // const nodesMap = rightsTreeRef.value.store.nodesMap
      // console.log(nodesMap)
      // const node = nodesMap[0]
      // console.log(node)
      // // 测试结束
      if (props.currentRoleId) {
        const { data: res } = await service.post('getRoleById', {
          id: props.currentRoleId
        })
        console.log('查找选中菜单项', +new Date() - date)
        date = +new Date()
        console.log(res)
        const selectedArr = []
        // console.log(rightsTreeRef.value.getNode(0))
        res.menus.forEach((item) => {
          // if (item.checked && item.pid) {
          //   selectedArr.push(item.id)
          // }
          if (rightsTreeRef.value.getNode(item.id).isLeaf && item.checked) {
            selectedArr.push(item.id)
          }
        })
        console.log(selectedArr)
        emit('update:modelValue', selectedArr)
      }
      await nextTick()
      console.log('选中对应菜单项', +new Date() - date)
      date = +new Date()
      const nodes = rightsTreeRef.value.store.nodesMap
      for (var i in nodes) {
        nodes[i].collapse()
      }
      console.log('收起菜单项', +new Date() - date)
      date = +new Date()
      rightsTreeRef.value.setCheckedKeys(props.modelValue, false)
      rightsTreeLoading.value = false
      emit('update:modelValue', rightsTreeRef.value.getCheckedKeys())
      emit('update:leafValue', rightsTreeRef.value.getCheckedKeys(true))
      emit(
        'update:halfCheckedValue',
        [
          ...rightsTreeRef.value.getCheckedKeys(),
          ...rightsTreeRef.value.getHalfCheckedKeys()
        ].filter((item) => item != 0)
      )
      const rootNode = rightsTreeRef.value.getNode(0)
      // console.log(rootNode)
      if (rootNode.checked) {
        emit('update:halfCheckedValue', [0])
      }
      console.log('重刷modelValue', +new Date() - date)
      date = +new Date()
    }
    getAllRightsList()
    // console.log(rightsList.value)
    const rightsTreeRef = ref([])
    const rightsTreeProps = {
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }
    const rightsFilterText = ref('')
    const rightsFilterNode = (value, data) => {
      if (!value) return true
      const flag = data.name.indexOf(value) !== -1
      return flag
    }
    const loadRightsNode = (node, resolve) => {
      if (node.level === 0) {
        return resolve([
          {
            id: 0,
            name: '全部',
            leaf: false
          }
        ])
      }
      // console.log(node)
      const data = rightsList.value
        .filter((item) => item.pid == node.data.id)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            // leaf: !rightsList.value.some(
            //   (childItem) => childItem.pid == item.id
            // )
            leaf: false
          }
        })
      resolve(data)
    }
    const rightsNameSelectedList = computed(() => {
      const filtered = []
      props.modelValue.forEach((id) => {
        if (rightsList.value.length > 0) {
          const item = rightsList.value.find((item) => item.id == id + '')
          if (props.modelValue.indexOf(item.pid) === -1) {
            filtered.push(item)
          }
        }
      })
      return filtered.map((item) => item.name).join(',')
    })
    let emitTimer = null
    const handleRightsCheckChange = () => {
      clearTimeout(emitTimer)
      emitTimer = setTimeout(() => {
        emit('update:modelValue', rightsTreeRef.value.getCheckedKeys())
        emit('update:leafValue', rightsTreeRef.value.getCheckedKeys(true))
        // console.log(rightsTreeRef.value.getHalfCheckedKeys())
        // console.log(rightsTreeRef.value.getCheckedKeys(true))
        emit(
          'update:halfCheckedValue',
          [
            ...rightsTreeRef.value.getCheckedKeys(),
            ...rightsTreeRef.value.getHalfCheckedKeys()
          ].filter((item) => item != 0)
        )
        const rootNode = rightsTreeRef.value.getNode(0)
        // console.log(rootNode)
        if (rootNode.checked) {
          emit('update:halfCheckedValue', [0])
        }
      }, 100)
    }
    const handleCheck = (data, {}) => {
      // console.log(data)
      if (data.id === '0') {
        if (!props.isRestrictRegion) return
      }
    }
    let rightsFilterTimer = null
    watch(rightsFilterText, (newValue) => {
      const nodes = rightsTreeRef.value.store.nodesMap
      if (newValue === '') {
        rightsTreeRef.value.filter(newValue)
        rightsTreeLoading.value = false
        for (var i in nodes) {
          nodes[i].collapse()
        }
        return
      }
      clearTimeout(rightsFilterTimer)
      rightsFilterTimer = setTimeout(() => {
        for (var i in nodes) {
          nodes[i].collapse()
        }
        rightsTreeLoading.value = true
        const matchedRights = rightsList.value.filter(
          (item) => item.name.indexOf(newValue) !== -1
        )
        for (let i = 0; i < matchedRights.length; i++) {
          const item = matchedRights[i]
          // console.log(item)
          if (
            rightsTreeRef.value.store.nodesMap[item] &&
            rightsTreeRef.value.store.nodesMap[item].expanded === true
          ) {
            continue
          }
          const nodesArr = []
          let current = item
          nodesArr.push(item)
          while (
            (current = rightsList.value.find(
              (item) => item.id === current.pid
            )) != null
          ) {
            nodesArr.push(current)
          }
          nodesArr.reverse()
          // console.log(nodesArr)
          nodesArr.forEach((item) => {
            const nodes = rightsTreeRef.value.store.nodesMap
            // console.log(rightsTreeRef.value.store.nodesMap)
            for (var i in nodes) {
              if (nodes[i].data.id == item.id) {
                // loadRegionNode(nodes[i], regionTreeResolve)
                // nodes[i].expanded = true
                nodes[i].expand()
                break
              }
            }
          })
        }
        setTimeout(() => {
          rightsTreeRef.value.filter(newValue)
          rightsTreeLoading.value = false
        }, 1000)
      }, 1500)
    })
    return {
      rightsList,
      rightsTreeLoading,
      getAllRightsList,
      rightsTreeRef,
      rightsTreeProps,
      rightsFilterText,
      rightsFilterNode,
      loadRightsNode,
      rightsNameSelectedList,
      handleRightsCheckChange,
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
</style>
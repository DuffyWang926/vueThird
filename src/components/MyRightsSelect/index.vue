<template>
  <div class="tree-container" v-loading="rightsTreeLoading">
    <el-input type="textarea" :rows="3" placeholder="此处展示所选权限列表" :model-value="rightsNameSelectedList" disabled resize="none" style="display: none"> </el-input>
    <el-input placeholder="输入关键字进行过滤" v-model="rightsFilterText"></el-input>
    <el-tree :data="data" ref="rightsTreeRef" :props="rightsTreeProps" :filter-node-method="rightsFilterNode" show-checkbox node-key="id" @check-change="handleRightsCheckChange"> </el-tree>
  </div>
</template>

<script>
import service from '@/utils/request'
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import { createLogger } from 'vuex'
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
    const data = ref([])
    const getAllRightsList = async () => {
      rightsTreeLoading.value = true
      let date = +new Date()
      let { data: res } = await service.post('backend/getAllMenu')
      console.log(res)
      console.log('请求所有菜单项', +new Date() - date)
      date = +new Date()
      rightsList.value = res.menus
      data.value = generateNodes()
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
        const { data: res } = await service.post('backend/getRoleById', {
          id: props.currentRoleId
        })
        console.log('查找选中菜单项', +new Date() - date)
        date = +new Date()
        console.log(res)
        const selectedArr = []
        // console.log(rightsTreeRef.value.getNode(0))
        res.menus
          .split(',')
          .map((item) => parseInt(item))
          .forEach((item) => {
            // if (item.checked && item.pid) {
            //   selectedArr.push(item.id)
            // }
            console.log(item)
            if (rightsList.value.find((rightItem) => rightItem.id == item) && rightsList.value.find((rightItem) => rightItem.id == item).leaf) {
              selectedArr.push(item)
            }
          })
        console.log(selectedArr)
        emit('update:modelValue', selectedArr)
      }
      rightsTreeLoading.value = false
      await nextTick()
      console.log('选中对应菜单项', +new Date() - date)
      date = +new Date()
      // const nodes = rightsTreeRef.value.store.nodesMap
      // for (var i in nodes) {
      //   nodes[i].collapse()
      // }
      // console.log('收起菜单项', +new Date() - date)
      // date = +new Date()
      rightsTreeRef.value.setCheckedKeys(props.modelValue, false)
      await nextTick()
      emit('update:modelValue', rightsTreeRef.value.getCheckedKeys())
      emit('update:leafValue', rightsTreeRef.value.getCheckedKeys(true))
      emit(
        'update:halfCheckedValue',
        [...rightsTreeRef.value.getCheckedKeys(), ...rightsTreeRef.value.getHalfCheckedKeys()].filter((item) => item != 0).sort((a, b) => a - b)
      )
      await nextTick()
      const rootNode = rightsTreeRef.value.getNode(0)
      // console.log(rootNode)
      // if (rootNode.checked) {
      //   emit('update:halfCheckedValue', [0])
      // }
      console.log('重刷modelValue', +new Date() - date)
      date = +new Date()
    }
    getAllRightsList()
    // console.log(rightsList.value)
    const rightsTreeRef = ref(null)
    const rightsTreeProps = {
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }
    const rightsFilterText = ref('')
    const rightsFilterNode = (value, data) => {
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
        name: '全部',
        leaf: false,
        parent: null
        // children: []
      }
      getChildren(root)
      function getChildren(data) {
        data.children = []
        rightsList.value.forEach((item) => {
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
      return [root]
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
          [...rightsTreeRef.value.getCheckedKeys(), ...rightsTreeRef.value.getHalfCheckedKeys()].filter((item) => item != 0).sort((a, b) => a - b)
        )
        const rootNode = rightsTreeRef.value.getNode(0)
        // console.log(rootNode)
        // if (rootNode.checked) {
        //   emit('update:halfCheckedValue', [0])
        // }
      }, 100)
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
        clearTimeout(rightsFilterTimer)
        return
      }
      clearTimeout(rightsFilterTimer)
      rightsFilterTimer = setTimeout(() => {
        // for (var i in nodes) {
        //   nodes[i].collapse()
        // }
        rightsTreeLoading.value = true
        const matchedRights = rightsList.value.filter((item) => item.name.indexOf(newValue) !== -1)
        // for (let i = 0; i < matchedRights.length; i++) {
        //   const item = matchedRights[i]
        //   // console.log(item)
        //   if (
        //     rightsTreeRef.value.store.nodesMap[item] &&
        //     rightsTreeRef.value.store.nodesMap[item].expanded === true
        //   ) {
        //     continue
        //   }
        //   const nodesArr = []
        //   let current = item
        //   nodesArr.push(item)
        //   while (
        //     (current = rightsList.value.find(
        //       (item) => item.id === current.pid
        //     )) != null
        //   ) {
        //     nodesArr.push(current)
        //   }
        //   nodesArr.reverse()
        //   // console.log(nodesArr)
        //   nodesArr.forEach((item) => {
        //     const nodes = rightsTreeRef.value.store.nodesMap
        //     // console.log(rightsTreeRef.value.store.nodesMap)
        //     for (var i in nodes) {
        //       if (nodes[i].data.id == item.id) {
        //         // loadRegionNode(nodes[i], regionTreeResolve)
        //         // nodes[i].expanded = true
        //         nodes[i].expand()
        //         break
        //       }
        //     }
        //   })
        // }
        setTimeout(() => {
          rightsTreeRef.value.filter(newValue)
          rightsTreeLoading.value = false
        }, 500)
      }, 1500)
    })
    watch(
      () => props.modelValue,
      () => {
        rightsTreeRef.value.setCheckedKeys(props.modelValue)
        // const leafCheckedIds = rightsList.value.filter((item) => item.leaf && props.modelValue.indexOf(item.id) !== -1).map((item) => item.id)
        // rightsTreeRef.value.setCheckedKeys(leafCheckedIds)
      }
    )
    return {
      data,
      rightsList,
      rightsTreeLoading,
      getAllRightsList,
      rightsTreeRef,
      rightsTreeProps,
      rightsFilterText,
      rightsFilterNode,
      rightsNameSelectedList,
      handleRightsCheckChange
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
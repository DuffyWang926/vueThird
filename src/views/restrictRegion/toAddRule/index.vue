<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>添加限售区域</span>
      </div>
    </template>
    <div class="flex-row">
      <div class="flex-col">
        <my-goods-select
          v-model="goodsIdSelectedList"
          textareaShow
          is-restrict-region
        ></my-goods-select>
      </div>
      <div class="flex-col">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="此处展示所选区域列表"
          :model-value="regionNameSelectedList"
          disabled
          resize="none"
        >
        </el-input>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="regionFilterText"
        ></el-input>
        <div class="tree-container" v-loading="regionTreeLoading">
          <el-tree
            ref="regionTreeRef"
            :props="regionTreeProps"
            :filter-node-method="regionFilterNode"
            :load="loadRegionNode"
            lazy
            show-checkbox
            node-key="id"
            @check-change="handleRegionCheckChange"
          >
          </el-tree>
        </div>
      </div>
      <div>
        <el-button type="success" @click="submit">保存</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import service from '@/utils/request'
import region from '@/mock/region'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'restrictRegionToAddRule',
  setup() {
    // const goodsList = ref([])
    const goodsIdSelectedList = ref([])
    // const goodsNameSelectedList = computed(() => {
    //   return goodsList.value
    //     .filter((item) => goodsIdSelectedList.value.indexOf(item.id) !== -1)
    //     .map((item) => item.name)
    //     .join(',')
    // })
    const regionTreeRef = ref(null)
    const regionTreeLoading = ref(false)
    const regionTreeProps = {
      label: 'name',
      children: 'children',
      isLeaf: 'leaf'
    }
    const regionFilterText = ref('')
    let regionFilterTimer = null
    watch(regionFilterText, (newValue) => {
      regionTreeLoading.value = true
      const nodes = regionTreeRef.value.store.nodesMap
      for (var i in nodes) {
        nodes[i].collapse()
      }
      if (newValue === '') {
        regionTreeRef.value.filter(newValue)
        regionTreeLoading.value = false
        return
      }
      clearTimeout(regionFilterTimer)
      regionFilterTimer = setTimeout(() => {
        const matchedRegion = region.filter(
          (item) => item.name.indexOf(newValue) !== -1
        )
        for (let i = 0; i < matchedRegion.length; i++) {
          const item = matchedRegion[i]
          // console.log(item)
          if (
            regionTreeRef.value.store.nodesMap[item] &&
            regionTreeRef.value.store.nodesMap[item].expanded === true
          ) {
            continue
          }
          const nodesArr = []
          let current = item
          nodesArr.push(item)
          while (
            (current = region.find((item) => item.id === current.pid)) != null
          ) {
            nodesArr.push(current)
          }
          nodesArr.reverse()
          console.log(nodesArr)
          nodesArr.forEach((item) => {
            const nodes = regionTreeRef.value.store.nodesMap
            console.log(regionTreeRef.value.store.nodesMap)
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
          regionTreeRef.value.filter(newValue)
          regionTreeLoading.value = false
        }, 1000)
      }, 500)
    })
    const regionFilterNode = (value, data) => {
      if (!value) return true
      const flag = data.name.indexOf(value) !== -1
      return flag
    }
    const loadRegionNode = (node, resolve) => {
      // if (!regionTreeResolve) {
      //   regionTreeResolve = resolve
      // }
      if (node.level === 0) {
        return resolve(
          region
            .filter((item) => item.pid == 0)
            .map((item) => {
              return {
                id: item.id,
                name: item.name,
                leaf: region.every((childItem) => childItem.pid !== item.id)
              }
            })
        )
      }
      console.log(node)
      const data = region
        .filter((item) => item.pid === node.data.id)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            leaf: !region.some((childItem) => childItem.pid === item.id)
          }
        })
      resolve(data)
    }
    const handleRegionCheckChange = () => {
      regionIdSelectedList.value = regionTreeRef.value.getCheckedKeys()
    }
    const regionIdSelectedList = ref([])
    const regionNameSelectedList = computed(() => {
      const filtered = []
      regionIdSelectedList.value.forEach((id) => {
        // const node = regionTreeRef.value.getNode(id)
        // const parentsId = []
        // let flag = true
        // for (let current = node.parent; current.id !== 0; current = current.parent) {
        //   if (regionIdSelectedList.value.indexOf(current.data.id) !== -1) {
        //     parentsId.push(current.data.id)
        //   }
        // }
        const item = region.find((item) => item.id === id)
        if (regionIdSelectedList.value.indexOf(item.pid) === -1) {
          filtered.push(item)
        }
      })
      return filtered.map((item) => item.name).join(',')
    })
    const router = useRouter()
    const submit = async () => {
      if (goodsIdSelectedList.value.length === 0) {
        return ElMessage({
          type: 'error',
          message: '请选择商品!'
        })
      } else if (regionIdSelectedList.value.length === 0) {
        return ElMessage({
          type: 'error',
          message: '请选择地区!'
        })
      }
      const res = await service.post('/addRestrictRegions', {
        goodsIds: goodsIdSelectedList.value,
        regionIds: regionIdSelectedList.value
      })
      console.log(res)
      if (res.status === 0) {
        ElMessage({
          type: 'success',
          message: '成功添加限售区域规则!'
        })
      }
      router.push({
        path: '/restrictRegionManage'
      })
    }
    return {
      // goodsList,
      goodsIdSelectedList,
      // goodsNameSelectedList,
      regionTreeRef,
      regionTreeProps,
      regionTreeLoading,
      loadRegionNode,
      regionFilterText,
      regionFilterNode,
      // regionTreeData,
      handleRegionCheckChange,
      regionIdSelectedList,
      regionNameSelectedList,
      submit
    }
  }
}
</script>

<style scoped lang="scss">
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  .flex-col {
    display: flex;
    width: 500px;
    margin-right: 20px;
    flex-direction: column;
    justify-content: space-between;
    .el-textarea,
    .el-input {
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
  }
}
</style>
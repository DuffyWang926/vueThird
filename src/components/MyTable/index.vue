<template>
  <div class="container">
    <el-table
      :data="data"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selectionShow" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="item in columns"
        :key="item.title + item.prop"
        :label="item.title"
        :width="item.width || ''"
      >
        <template v-slot="scope">
          <el-image
            v-if="item.image"
            :src="scope.row[item.prop]"
            style="width: 100px; height: 100px"
            fit="cover"
          ></el-image>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :width="operationWidth"
        v-if="operationShow"
        label="操作"
        fixed="right"
      >
        <template v-slot="scope">
          <el-button
            v-if="previewShow"
            size="mini"
            type="primary"
            @click="$emit('preview', scope.row.id || scope.row)"
            >{{ preiviewText }}</el-button
          >
          <el-button
            v-if="switchShow"
            size="mini"
            :type="scope.row[switchProp] ? 'danger' : 'success'"
            @click="handleSwitch(scope.row)"
            >{{
              scope.row[switchProp] ? switchOpenText : switchClosedText
            }}</el-button
          >
          <el-button
            v-if="editShow"
            size="mini"
            type="warning"
            @click="$emit('edit', scope.row.id || scope.row)"
            >{{ editText }}</el-button
          >
          <el-button
            v-if="deleteShow"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >{{ deleteText }}</el-button
          >
          <slot name="userbtns" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
  name: 'MyTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    operationShow: {
      type: Boolean,
      required: false,
      default: true
    },
    operationWidth: {
      type: Number,
      required: false,
      default: 200
    },
    previewShow: {
      type: Boolean,
      required: false,
      default: false
    },
    switchShow: {
      type: Boolean,
      required: false,
      default: false
    },
    editShow: {
      type: Boolean,
      required: false,
      default: false
    },
    deleteShow: {
      type: Boolean,
      required: false,
      default: false
    },
    selectionShow: {
      type: Boolean,
      required: false,
      default: false
    },
    preiviewText: {
      type: String,
      required: false,
      default: '预览'
    },
    editText: {
      type: String,
      required: false,
      default: '编辑'
    },
    deleteText: {
      type: String,
      required: false,
      default: '删除'
    },
    deleteDialogText: {
      type: String,
      required: false,
      default: '确认删除？'
    },
    switchOpenText: {
      type: String,
      required: false,
      default: '禁用'
    },
    switchClosedText: {
      type: String,
      required: false,
      default: '启用'
    },
    switchOpenDialogText: {
      type: String,
      required: false,
      default: '确认启用？'
    },
    switchCloseDialogText: {
      type: String,
      required: false,
      default: '确认禁用？'
    },
    switchProp: {
      type: String,
      required: false
    },
    selected: {
      type: Array,
      required: false
    }
  },
  setup(props, { emit }) {
    const handleDelete = (row) => {
      ElMessageBox.confirm(props.deleteDialogText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          emit('delete', row.id || row)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const handleSwitch = (row) => {
      ElMessageBox.confirm(
        row[props.switchProp]
          ? props.switchCloseDialogText
          : props.switchOpenDialogText,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          row[props.switchProp] = !row[props.switchProp]
          emit('switch', row)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }
    const handleSelectionChange = (val) => {
      emit('update:selected', val)
    }
    return {
      handleDelete,
      handleSwitch,
      handleSelectionChange
    }
  }
}
</script>

<style scoped lang="scss">
</style>

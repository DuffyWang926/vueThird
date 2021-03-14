<template>
  <el-upload
    class="upload-demo"
    list-type="picture-card"
    action="https://upload-z1.qiniup.com/"
    :data="qiniuData"
    :before-upload="handleBeforeUpload"
    :before-remove="handleBeforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :multiple="multiple"
    :limit="limit"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: 'MyUpload',
  props: {
    imageList: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    limit: {
      type: Number,
      required: false,
      default: 1
    }
  },
  setup(props, { emit }) {
    const qiniuData = reactive({
      key: '',
      token:
        'rlmWmpY-dufqi0VdSO-UznDKPdpD_Vlcnb0pDq9a:-4e4znkLkheRr2xSkLRBKuTPilQ=:eyJzY29wZSI6ImJqamtrZGF0YSIsImRlYWRsaW5lIjoxNjE1NTQwMzg1fQ=='
    })
    const imageList = props.imageList
    return {
      qiniuData,
      handleBeforeUpload: (file) => {
        console.log('handle before upload')
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        if (!isJPG && !isPNG) {
          ElMessage.error('图片只能是 JPG/PNG 格式!')
          return false
        }
        const extName = file.name.slice(file.name.lastIndexOf('.'))
        const mainName = file.name.slice(0, file.name.indexOf('.'))
        qiniuData.key = `${Math.floor(Math.random() * 200)}/${Math.floor(
          Math.random() * 200
        )}/${mainName}${extName}`
      },
      handleSuccess: (res) => {
        console.log('handle success')
        imageList.push('https://image.huashangjk.com/' + res.key)
        emit('update:image-list', imageList)
      },
      handleBeforeRemove: (file, fileList) => {
        console.log('handle before remove')
        console.log(file, fileList)
        const index = fileList.indexOf(file)
        imageList.splice(index, 1)
        emit('update:image-list', imageList)
      },
      handleError: (err) => {
        console.log('handle error')
        console.log(err)
        ElMessage.error('文件上传失败')
      },
      handleExceed: () => {
        ElMessage.error('最多上传' + props.limit + '个文件！')
      }
    }
  }
}
</script>

<style scoped></style>

<template>
  <el-upload
    style="margin-right: auto; margin-left: 0"
    class="upload-demo"
    :list-type="isVideo ? 'text' : 'picture-card'"
    :http-request="uploadRequest"
    :before-upload="handleBeforeUpload"
    :before-remove="handleBeforeRemove"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :multiple="multiple"
    :limit="limit"
    :file-list="myFileList"
  >
    <el-button type="primary">{{ uploadText }}</el-button>
  </el-upload>
  <el-dialog v-model="dialogVisible" @close="handleClose">
    <template #title> 预览图片/视频 </template>
    <video :src="currentFile" v-if="isVideo" controls></video>
    <img :src="currentFile" v-else />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >结束预览</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
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
      default: 9
    },
    uploadText: {
      type: String,
      required: false,
      default: '点击上传'
    },
    isVideo: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const qiniuData = reactive({
      key: '',
      token:
        'rlmWmpY-dufqi0VdSO-UznDKPdpD_Vlcnb0pDq9a:1fWxIA4HOIEmWaiO1uIMFW86uvY=:eyJzY29wZSI6ImJqamtrZGF0YSIsImRlYWRsaW5lIjoxNjE2MzIxNzQxfQ=='
    })
    const imageList = props.imageList
    const myFileList = ref(
      imageList.map((item) => {
        return {
          url: item,
          name: item.slice(item.lastIndexOf('/') + 1)
        }
      })
    )
    const handleBeforeUpload = (file) => {
      console.log('handle before upload')
      if (props.isVideo) {
      } else {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        if (!isJPG && !isPNG) {
          ElMessage.error('图片只能是 JPG/PNG 格式!')
          return false
        }
      }
      const extName = file.name.slice(file.name.lastIndexOf('.'))
      const mainName = file.name.slice(0, file.name.indexOf('.'))
      qiniuData.key = `${Math.floor(Math.random() * 200)}/${Math.floor(
        Math.random() * 200
      )}/${mainName}${extName}`
      console.log(qiniuData.key)
    }
    const handlePreview = (file) => {
      console.log(file)
      currentFile.value = file.url
      dialogVisible.value = true
    }
    const handleSuccess = (res) => {
      console.log('handle success')
      console.log(res)
      imageList.push('https://image.huashangjk.com/' + res.key)
      console.log(res.key.slice(res.key.lastIndexOf('/') + 1))
      myFileList.value.push({
        url: 'https://image.huashangjk.com/' + res.key,
        name: res.key.slice(res.key.lastIndexOf('/') + 1)
      })
      if (!props.multiple) {
        emit('update:image-list', imageList.slice(-1))
        myFileList.value = [
          {
            url: 'https://image.huashangjk.com/' + res.key,
            name: res.key.slice(res.key.lastIndexOf('/') + 1)
          }
        ]
      } else {
        emit('update:image-list', imageList)
      }
    }
    const handleBeforeRemove = (file, fileList) => {
      console.log('handle before remove')
      console.log(file, fileList)
      const index = fileList.findIndex((item) => item.url === file.url)
      imageList.splice(index, 1)
      myFileList.value.splice(
        myFileList.value.findIndex((item) => item.url === file.url),
        1
      )
      emit('update:image-list', imageList)
    }
    const uploadRequest = (param) => {
      let fileObj = param.file
      let form = new FormData()
      form.append('file', fileObj)
      form.append('token', qiniuData.token)
      form.append('key', qiniuData.key)
      axios
        .post(`https://upload-z1.qiniup.com/`, form)
        .then((res) => {
          console.log(res)
          handleSuccess(res.data)
        })
        .catch((res) => {
          console.error('Error！')
        })
    }
    const handleExceed = () => {
      ElMessage.error('最多上传' + props.limit + '个文件！')
    }
    const handleChange = () => {
      // if (!props.multiple) {
      //   emit('update:image-list', imageList.slice(-1))
      // }
    }
    const handleError = (err) => {
      console.log('handle error')
      console.log(err)
      ElMessage.error('文件上传失败')
    }
    const refresh = () => {
      myFileList.value = imageList.map((item) => {
        return {
          url: item,
          name: item.slice(item.lastIndexOf('/') + 1)
        }
      })
    }
    const dialogVisible = ref(false)
    const currentFile = ref('')
    const handleClose = () => {
      currentFile.value = ''
    }
    return {
      qiniuData,
      handleBeforeUpload,
      handlePreview,
      handleSuccess,
      handleBeforeRemove,
      handleError,
      handleExceed,
      handleChange,
      myFileList,
      refresh,
      uploadRequest,
      dialogVisible,
      currentFile,
      handleClose
    }
  }
}
</script>

<style scoped lang="scss">
.upload-demo {
  /deep/.el-upload-list__item.is-ready,
  /deep/.el-upload-list__item.is-uploading,
  // /deep/.el-upload-list__item.el-list-enter-active,
  // /deep/.el-upload-list__item.el-list-enter-to,
  // /deep/.el-upload-list__item.el-list-leave-active,
  /deep/.el-upload-list__item.el-list-leave-to {
    display: none;
  }
}
.el-dialog {
  img,
  video {
    width: 100%;
  }
}
</style>

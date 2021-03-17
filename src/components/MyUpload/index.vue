<template>
  <el-upload
    style="margin-right: auto; margin-left: 0"
    class="upload-demo"
    list-type="picture-card"
    action="https://upload-z1.qiniup.com/"
    :data="qiniuData"
    :before-upload="handleBeforeUpload"
    :before-remove="handleBeforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :multiple="multiple"
    :limit="limit"
    :file-list="myFileList"
  >
    <el-button type="primary">{{ uploadText }}</el-button>
  </el-upload>
</template>

<script>
import { reactive, ref } from 'vue'
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
      default: 9
    },
    uploadText: {
      type: String,
      required: false,
      default: '点击上传'
    }
  },
  setup(props, { emit }) {
    const qiniuData = reactive({
      key: '',
      token:
        'rlmWmpY-dufqi0VdSO-UznDKPdpD_Vlcnb0pDq9a:cAhH_Y2yY4kfbQEfkGBzwk1zbpw=:eyJzY29wZSI6ImJqamtrZGF0YSIsImRlYWRsaW5lIjoxNjE1OTc0NDI1fQ=='
    })
    const imageList = props.imageList
    const myFileList = ref(
      imageList.map((item) => {
        return {
          url: item
        }
      })
    )
    return {
      qiniuData,
      handleBeforeUpload: (file) => {
        console.log('handle before upload')
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        // if (!isJPG && !isPNG) {
        //   ElMessage.error('图片只能是 JPG/PNG 格式!')
        //   return false
        // }
        const extName = file.name.slice(file.name.lastIndexOf('.'))
        const mainName = file.name.slice(0, file.name.indexOf('.'))
        qiniuData.key = `${Math.floor(Math.random() * 200)}/${Math.floor(
          Math.random() * 200
        )}/${mainName}${extName}`
        console.log(qiniuData.key)
      },
      handleSuccess: (res, fileList) => {
        console.log('handle success')
        console.log(res, fileList)
        imageList.push('https://image.huashangjk.com/' + res.key)
        myFileList.value.push({
          url: 'https://image.huashangjk.com/' + res.key
        })
        if (!props.multiple) {
          emit('update:image-list', imageList.slice(-1))
          myFileList.value = [
            { url: 'https://image.huashangjk.com/' + res.key }
          ]
        } else {
          emit('update:image-list', imageList)
        }
      },
      handleBeforeRemove: (file, fileList) => {
        console.log('handle before remove')
        console.log(file, fileList)
        const index = fileList.findIndex((item) => item.url === file.url)
        imageList.splice(index, 1)
        myFileList.value.splice(
          myFileList.value.findIndex((item) => item.url === file.url),
          1
        )
        // myFileList.value = imageList.map((item) => {
        //   return {
        //     url: item
        //   }
        // })
        emit('update:image-list', imageList)
      },
      handleError: (err) => {
        console.log('handle error')
        console.log(err)
        ElMessage.error('文件上传失败')
      },
      handleExceed: () => {
        ElMessage.error('最多上传' + props.limit + '个文件！')
      },
      handleChange: () => {
        // if (!props.multiple) {
        //   emit('update:image-list', imageList.slice(-1))
        // }
      },
      myFileList,
      refresh: () => {
        myFileList.value = imageList.map((item) => {
          return {
            url: item
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-demo {
  /deep/.el-upload-list__item.is-ready,
  // /deep/.el-upload-list__item.is-uploading,
  // /deep/.el-upload-list__item.el-list-enter-active,
  // /deep/.el-upload-list__item.el-list-enter-to,
  // /deep/.el-upload-list__item.el-list-leave-active,
  /deep/.el-upload-list__item.el-list-leave-to {
    display: none;
  }
}
</style>

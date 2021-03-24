<template>
  <my-upload v-model:image-list="imageList" isVideo></my-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const imageList = ref([])
    imageList.value.push(
      'https://image.huashangjk.com/121/2/21/1616315777751hUdRjGWJeQ.mp4'
    )
    return {
      imageList
    }
  }
}
</script>

<style>
</style>
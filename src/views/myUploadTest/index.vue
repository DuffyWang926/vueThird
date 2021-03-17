<template>
  <my-upload v-model:image-list="imageList" multiple></my-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const imageList = ref([])
    imageList.value.push(
      'https://image.huashangjk.com/121/2/17/1615944928908y5wqjRmxzA.jpeg'
    )
    return {
      imageList
    }
  }
}
</script>

<style>
</style>
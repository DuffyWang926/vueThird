<template>
  <my-upload
    v-model:image-list="imageList"
    :multiple="true"
    :limit="3"
  ></my-upload>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const imageList = ref([])
    return {
      imageList
    }
  }
}
</script>

<style>
</style>
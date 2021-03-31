<template>
  <!-- <keep-alive :exclude="exclude"> -->
  <router-view :key="key" />
  <!-- </keep-alive> -->
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  setup() {
    // const exclude = []
    // exclude.push('GroupList')
    // exclude.push('GroupBuyAdd')
    const route = useRoute()
    const key = computed(() => {
      return route.fullPath + Math.random()
    })
    return {
      // exclude
      key
    }
  }
}
</script>
<style lang="scss">
@import './styles/base.scss';
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}
</style>

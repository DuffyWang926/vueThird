<template>
  <keep-alive :include="include">
    <router-view :key="key"></router-view>
  </keep-alive>
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
      // debugger
      console.log(route.fullPath)
      return route.fullPath
    })
    // const include = ['RouterView', 'Index', 'groupBuyEdit/1', 'GroupBuy', 'GroupBuyAdd', 'GroupBuyManage', 'GroupListWrap', 'GroupList']
    const include = ['RouterView', 'Index', 'groupBuyEdit/1', 'GroupBuy', 'groupBuyAdd', 'GroupBuyManage', 'GroupListWrap', 'GroupList']
    return {
      // exclude
      key,
      include
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

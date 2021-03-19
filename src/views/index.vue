
<template>
  <el-container>
    <el-aside :width="isCollapse ? '100px' : '200px'">
      <div class="title" :class="[isCollapse ? 'collapse' : '']">
        <span>荐康客</span>
      </div>
      <div class="dashboard" :class="[isCollapse ? 'collapse' : '']">
        <i class="el-icon-setting"></i>
        <span>仪表盘</span>
      </div>
      <div class="menu-title" :class="[isCollapse ? 'collapse' : '']">
        <span>基础设置</span>
      </div>
      <el-menu
        :uniqueOpened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="currentActivePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#5076dc"
        text-color="#fff"
        active-text-color="#5076dc"
        router
      >
        <el-submenu
          v-for="subMenu in subMenus"
          :key="subMenu.title"
          :index="subMenu.title"
        >
          <template #title>
            <i class="el-icon-setting"></i>
            <span>{{ subMenu.title }}</span>
          </template>
          <el-menu-item
            v-for="menuItem in subMenu.children"
            :key="menuItem.index"
            :index="menuItem.index"
            >{{ menuItem.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-arrow-left" v-else></i>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="links">
          <el-tag
            v-for="item in links"
            :key="item.url"
            :effect="item.url === currentChildPath ? 'dark' : 'light'"
            @close="handleLinkClose(item)"
            :closable="item.url !== currentChildPath"
            @click="handleLinkClick(item)"
            >{{ item.title }}</el-tag
          >
        </div>
        <div class="user">
          <img src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
          <span>zhaohanyu</span>
        </div>
      </el-header>
      <el-main><router-view class="router-view" /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { computed, ref, reactive } from 'vue'
import { useStore, mapGetters, mapState } from 'vuex'
import { indexRouter } from '@/router/index'
import rights from '@/mock/rights.js'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'index',
  setup() {
    // const store = useStore()
    // const subMenus = store.getters.getSubMenus
    // const subMenus = mapGetters(['menu/getSubMenus'])[0]
    // console.log(subMenus)
    // console.log(subMenus())
    const getSubMenus = () => {
      let subMenus = [
        '系统配置',
        '安全管理',
        '会员管理',
        '商城管理',
        '订单管理',
        '营销管理',
        '报表',
        '客服',
        '仓库与运费',
        '首页配置',
        '返利管理',
        '日志管理'
      ].map((item) => {
        return {
          title: item,
          children: []
        }
      })
      const activeRights = rights.filter(
        (item) => item.checked && item.pid !== 0
      )
      indexRouter.children.forEach((item) => {
        if (activeRights.find((right) => item.meta.id === right.id)) {
          const subMenu = subMenus.find(
            (subMenu) => subMenu.title === item.meta.parent
          )
          const menuItem = {
            index: item.path,
            title: item.meta.title,
            sort: item.meta.sort
          }
          subMenu.children.push(menuItem)
        }
      })
      subMenus = subMenus.filter((item) => item.children.length > 0)
      subMenus.forEach((subMenu) =>
        subMenu.children.sort((a, b) => a.sort - b.sort)
      )
      return subMenus
    }
    const subMenus = computed(getSubMenus)
    console.log(getSubMenus())
    // const currentActivePath = ref('')
    const store = useStore()
    const router = useRouter()
    console.log(store.getters['menu/currentActivePath'])
    const currentActivePath = computed(() => {
      const activePath = store.getters['menu/currentActivePath']
      console.log(activePath)
      return activePath
    })
    const getLinks = () => {
      const links = store.getters['links/links']
      console.log(links)
      return links
    }
    const links = computed(getLinks)
    const route = useRoute()
    const currentChildPath = computed(() => {
      return route.matched.find((item) => item.meta.index === 3).path
    })
    const handleLinkClose = (item) => {
      store.commit('links/deleteLink', item)
    }
    const handleLinkClick = (item) => {
      router.push({
        path: item.url
      })
    }
    const isCollapse = ref(false)
    return {
      subMenus,
      currentActivePath,
      isCollapse,
      links,
      currentChildPath,
      handleLinkClose,
      handleLinkClick
    }
  }
}
</script>

<style lang="scss" scoped>
/*切换样式出错处理*/
.router-view {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

.el-aside {
  background-color: #5076dc;
  min-height: 1000px;
  overflow-x: hidden;
}

.el-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 70px !important;
  .links {
    display: flex;
    width: 150px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .el-tag {
      margin-right: 10px;
    }
  }
  .user {
    display: flex;
    width: 150px;
    height: 40px;
    border-left: 1px solid #ccc;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    span {
      font-size: 14px;
      color: #666;
    }
  }
}

.el-main {
  background-color: #f3f4f7;
}

.title {
  display: flex;
  height: 70px;
  margin: 0 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &.collapse {
    justify-content: center;
  }
  span {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
}

.menu-title {
  margin: 20px 20px 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  &.collapse {
    text-align: center;
    margin-bottom: 20px;
  }
}

.dashboard {
  display: flex;
  align-items: center;
  margin: 0 20px;
  height: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 12px;
  color: #fff;
  line-height: 40px;
  &.collapse {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 10px 0;
    font-size: 12px;
    line-height: 12px;
    i {
      margin-right: 0;
    }
  }
  i {
    width: 24px;
    // vertical-align: middle;
    font-size: 18px;
    margin-right: 5px;
    text-align: center;
  }
}

.el-menu {
  border-right: 0;
  /deep/i {
    color: #fff;
  }
  /deep/.el-menu--inline {
    margin: 10px 10px !important;
    background-color: #fff !important;
    border-radius: 5px !important;
    .el-menu-item {
      background-color: transparent !important;
    }
  }
  .el-menu-item {
    display: flex !important;
    width: 100%！ !important;
    height: 24px !important;
    background-color: #fff !important;
    line-height: 24px !important;
    font-size: 12px !important;
    color: #000 !important;
    box-sizing: border-box !important;
    &.is-active {
      color: #5076dc !important;
    }
  }
  .el-submenu {
    span {
      font-size: 12px !important;
    }
  }
}

/deep/.el-menu--collapse {
  margin: 0 auto !important;
  .el-submenu {
    /deep/.el-submenu__title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto !important;
      span {
        width: auto !important;
        margin-top: 2px;
        height: 14px !important;
        line-height: 14px !important;
        visibility: visible;
      }
    }
  }
}

.collapse-btn {
  position: relative;
  margin: 10px auto;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  i {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 24px;
    height: 24px;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
}
</style>

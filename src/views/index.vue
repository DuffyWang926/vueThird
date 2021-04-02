
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
      <!-- <div class="menu-title" :class="[isCollapse ? 'collapse' : '']">
        <span>基础设置</span>
      </div> -->
      <el-menu
        :uniqueOpened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="currentActivePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#222834"
        text-color="#fff"
        active-text-color="#5076dc"
        router
      >
        <el-submenu v-for="subMenu in subMenus" :key="subMenu.title" :index="subMenu.title" popper-class="menupopper">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>{{ subMenu.title }}</span>
          </template>
          <el-menu-item v-for="menuItem in subMenu.children" :key="menuItem.index" :index="menuItem.index">{{ menuItem.title }}</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-arrow-left" v-else></i>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="top">
          <i class="el-icon-s-fold hamburger" v-if="!isCollapse" @click="isCollapse = true"></i>
          <i class="el-icon-s-unfold hamburger" v-else @click="isCollapse = false"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-if="route.matched[1]">{{ route.matched[1].meta.parent }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="route.matched[1]" :to="route.matched[1].path">{{ route.matched[1].meta.title }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="route.matched[2]" :to="route.fullPath" class="last">{{ route.matched[2].meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown>
            <template #default>
              <div class="user">
                <img src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                <span>{{ store.getters['user/getUsername'] }}</span>
                <span class="el-dropdown-link"><i class="el-icon-caret-bottom"></i> </span>
              </div>
            </template>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="passwordDialogVisible = true">修改密码</el-dropdown-item>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="links-wrapper">
          <div class="left"><i class="el-icon-arrow-left"></i></div>
          <div class="links">
            <!-- <el-tag
              v-for="item in links"
              :key="item.url"
              :effect="item.url === currentLink ? 'dark' : 'light'"
              @close="handleLinkClose(item)"
              :closable="item.url !== currentLink"
              @click="handleLinkClick(item)"
              >{{ item.title }}</el-tag
            > -->
            <div class="link-tag" v-for="item in links" :key="item.url" :class="[item.url === currentLink ? 'dark' : 'light']" @click="handleLinkClick(item)">
              <span>{{ item.title }}</span>
              <i class="el-icon-close" @click.stop="handleLinkClose(item)"></i>
            </div>
          </div>
          <div class="right"><i class="el-icon-arrow-right"></i></div>
        </div>
      </el-header>
      <el-main>
        <!-- <keep-alive :include="include"><router-view :key="key" /></keep-alive> -->
        <keep-alive><router-view :key="key" /></keep-alive>
        <!-- <router-view v-slot="{ Component }" :key="key">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view> -->
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="passwordDialogVisible" width="500px" @close="handlePasswordClose" destroy-on-close>
    <template #title>修改密码</template>
    <el-form :model="passwordForm" ref="passwordFormRef" label-width="80px">
      <el-form-item label="旧的密码" prop="oldPassword" :rules="passwordRules">
        <el-input v-model="passwordForm.oldPassword" placeholder="请输入旧密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新的密码" prop="newPassword" :rules="passwordRules">
        <el-input v-model="passwordForm.newPassword" placeholder="请输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" :rules="confirmPasswordRules">
        <el-input v-model="passwordForm.confirmPassword" placeholder="请输入确认密码" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePasswordChange">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useStore, mapGetters, mapState } from 'vuex'
import { indexRouter } from '@/router/index'
// import rights from "@/mock/rights.js";
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '@/utils/request'
export default {
  name: 'Index',
  setup() {
    // const store = useStore()
    // const subMenus = store.getters.getSubMenus
    // const subMenus = mapGetters(['menu/getSubMenus'])[0]
    // console.log(subMenus)
    // console.log(subMenus())
    const store = useStore()
    const route = useRoute()
    const rights = store.getters['user/getRights']
    console.log('rights:', rights)

    const getSubMenus = () => {
      let subMenus = ['系统配置', '安全管理', '会员管理', '商城管理', '订单管理', '营销管理', '报表', '客服', '仓库与运费', '首页配置', '返利管理', '日志管理'].map((item) => {
        return {
          title: item,
          children: []
        }
      })
      const activeRights = rights.filter((item) => item.checked && item.pid !== 0)
      indexRouter.children.forEach((item) => {
        if (activeRights.find((right) => item.meta.id === right.id)) {
          const subMenu = subMenus.find((subMenu) => subMenu.title === item.meta.parent)
          const menuItem = {
            index: item.path,
            title: item.meta.title,
            sort: item.meta.sort
          }
          subMenu.children.push(menuItem)
        }
      })
      subMenus = subMenus.filter((item) => item.children.length > 0)
      subMenus.forEach((subMenu) => subMenu.children.sort((a, b) => a.sort - b.sort))
      return subMenus
    }
    const subMenus = computed(getSubMenus)
    console.log(getSubMenus())
    // const currentActivePath = ref('')
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
    // const route = useRoute()
    // const currentChildPath = computed(() => {
    //   return route.matched.find((item) => item.meta.index === 3).path
    // })
    const currentLink = computed(() => {
      return store.getters['links/currentLink']
    })
    const handleLinkClose = (item) => {
      console.log(item)
      if (item.url == store.getters['links/currentLink']) {
        router.push('/')
      }
      store.commit('links/deleteLink', item)
    }
    const handleLinkClick = (item) => {
      router.push(item.url)
    }
    const isCollapse = ref(false)
    onMounted(() => {
      const linksDOM = document.querySelector('.links')
      console.log(linksDOM)
      const $ = window.$
      console.log($)
      $('.right').click(function () {
        const maxLeft = linksDOM.scrollWidth - linksDOM.clientWidth
        const left = Math.min(maxLeft, linksDOM.scrollLeft + linksDOM.clientWidth)
        $('.links').animate({ scrollLeft: left + 'px' }, 300)
      })
      $('.left').click(function () {
        const left = Math.max(0, linksDOM.scrollLeft - linksDOM.clientWidth)
        $('.links').animate({ scrollLeft: left + 'px' }, 300)
      })
      watch(currentLink, async () => {
        await nextTick()
        const index = store.getters['links/links'].findIndex((item) => item.url === store.getters['links/currentLink'])
        console.log(index)
        const offsetLeft = $('.links-wrapper .links .link-tag')[index].offsetLeft
        const offsetWidth = $('.links-wrapper .links .link-tag')[index].offsetWidth
        console.log(offsetLeft)
        if (offsetLeft < linksDOM.scrollLeft) {
          $('.links').animate({ scrollLeft: offsetLeft + 'px' }, 300)
        } else if (offsetLeft + offsetWidth - linksDOM.scrollLeft > linksDOM.clientWidth) {
          $('.links').animate(
            {
              scrollLeft: offsetLeft + offsetWidth - linksDOM.clientWidth + 'px'
            },
            300
          )
        }
        // const maxLeft = links.scrollWidth - links.clientWidth
        // $('.links').animate({ scrollLeft: maxLeft + 'px' }, 300)
      })
      // document.querySelector('.right').addEventListener('click', function () {
      //   // links.scrollLeft += links.clientWidth
      //   // links.scrollTo((links.scrollLeft += links.clientWidth), 0)

      //   links.scrollTo(links.scrollLeft + links.clientWidth, 0)
      //   console.log(links.scrollLeft)
      //   console.log(links.clientWidth)
      //   console.log('scroll')
      // })

      // document.querySelector('.left').addEventListener('click', function () {
      //   links.scrollTo(links.scrollLeft - links.clientWidth, 0)
      //   console.log(links.scrollLeft)
      //   console.log(links.clientWidth)
      //   console.log('scroll')
      // })
    })
    const passwordDialogVisible = ref(false)
    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    const handlePasswordClose = () => {
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    }
    const passwordFormRef = ref(null)
    const handlePasswordChange = () => {
      passwordFormRef.value.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm('确定修改密码吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const passwordFormCopy = {}
              // passwordFormCopy.id = passwordForm.id
              passwordFormCopy.username = store.getters['user/getUsername']
              passwordFormCopy.newPassword = passwordForm.newPassword
              const res = await service.post('modifySelfPwd', passwordFormCopy)
              if (res.status === 0) {
                ElMessage.success('密码修改成功')
              }
              passwordDialogVisible.value = false
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消修改'
              })
            })
        } else {
          console.log('invalid')
          return false
        }
      })
    }
    const passwordRules = [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位！'))
          } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[1-9]/.test(value)) {
            callback(new Error('密码必须包含大写字母小写字母和数字！'))
          } else if (!/^\w*$/.test(value)) {
            callback(new Error('密码只能包含数字字母下划线！'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
    const confirmPasswordRules = [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('密码长度至少6位！'))
          } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[1-9]/.test(value)) {
            callback(new Error('密码必须包含大写字母小写字母和数字！'))
          } else if (!/^\w*$/.test(value)) {
            callback(new Error('密码只能包含数字字母下划线！'))
          } else if (value !== passwordForm.newPassword) {
            callback('两次输入密码不一致！')
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
    const logout = () => {
      store.commit('user/logoutMutation')
      ElMessage.success('已退出登录')
      router.push('/login')
    }
    const key = computed(() => {
      return route.fullPath
    })
    return {
      store,
      subMenus,
      currentActivePath,
      isCollapse,
      links,
      // currentChildPath,
      currentLink,
      handleLinkClose,
      handleLinkClick,
      route,
      passwordDialogVisible,
      passwordForm,
      handlePasswordClose,
      passwordFormRef,
      handlePasswordChange,
      passwordRules,
      confirmPasswordRules,
      logout,
      key
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
  // background-color: #5076dc;
  background-color: #222834;
  min-height: 1000px;
  overflow-x: hidden;
}

.el-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 72px !important;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    .hamburger {
      margin-left: 0;
      margin-right: 10px;
      font-size: 20px;
    }
    .el-breadcrumb {
      flex: 1;
      .last {
        /deep/.el-breadcrumb__inner {
          font-weight: bold;
          color: #303133;
          &:hover {
            color: #409eff;
          }
        }
        .el-breadcrumb__inner {
          font-weight: bold;
          color: #303133;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
    .user {
      display: flex;
      width: 150px;
      height: 40px;
      // border-left: 1px solid #ccc;
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
  .links-wrapper {
    height: 32px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-left: -10px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // flex: 1 1 0;
    overflow: auto;
    // &::-webkit-scrollbar {
    //   width: 0;
    //   height: 0;
    // }
    .left,
    .right {
      width: 25px;
      height: 30px;
      color: #999;
      font-weight: bold;
      // text-align: center;
      line-height: 30px;
      // box-shadow: 0px 0px 20px 1px #ccc;
      &:hover {
        color: skyblue;
      }
    }
    .left {
      text-align: left;
      // margin-right: 10px;
    }
    .right {
      text-align: right;
      // margin-left: 10px;
    }
    .links {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 0;
      overflow-x: auto;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .link-tag {
        display: flex;
        height: 30px;
        padding: 0 10px;
        border-top: none;
        border-bottom: none;
        border-right: 1px solid #ccc;
        border-radius: 0;
        flex-direction: row;
        align-items: center;
        background-color: #fff;
        span {
          font-size: 14px;
          // font-weight: bold;
          color: #666;
          line-height: 14px;
          white-space: nowrap;
        }
        i {
          margin-left: 5px;
          font-size: 12px;
          transform: translateY(1px);
        }
        &.dark {
          background-color: #eeeeee;
        }
      }
      .link-tag:first-child {
        border-left: 1px solid #ccc;
      }
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

.el-aside {
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
          visibility: visible !important;
        }
      }
    }
  }
}

.el-aside {
  .el-menu--collapse {
    margin: 0 auto !important;
    .el-submenu {
      .el-submenu__title {
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
          visibility: visible !important;
        }
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

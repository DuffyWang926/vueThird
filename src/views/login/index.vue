<template>
  <div class="login centerPage">
    <div class="centerCon">
      <el-input
        placeholder="请输入用户"
        v-model="name"
        class='baseInput'
        clearable>
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        class='baseInput'
        type='password'
        clearable>
      </el-input>
      <el-button round @click="loginClick()">登录</el-button>

    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "login",
  setup() {
    const $router = useRouter();
    const $store = useStore();
    const { ctx } = getCurrentInstance();
    const loginForm = reactive({
      emailPhone: "",
      password: ""
    });
    const name = ref('')
    const password = ref('')
    
    const loginClick = () => {
      debugger
      $store.dispatch('user/login',{name:name.value,password:password.value})
    };


    return {
      name,
      password,
      $router,
      loginForm,
      loginClick
    };
  }
};
</script>

<style scoped lang="scss">
.login{
  .centerCon{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
  }
  
}
</style>

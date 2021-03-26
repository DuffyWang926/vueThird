<template>
  <div class="bg">
    <div class="loginBox">
      <el-card class="box-card" label-width="320px" shadow="never">
        <template #header>
          <div class="card-header">管理员登录</div>
        </template>
        <el-form :model="loginForm" :rules="loginRules" ref="formRef" label-position="top">
          <el-form-item prop="username" label="登录账号">
            <!-- <i class="el-icon-s-custom"></i> -->
            <el-input size="large" v-model="loginForm.username" placeholder="请输入账户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="登录密码">
            <!-- <i class=" el-icon-lock" ></i> -->
            <el-input size="large" v-model="loginForm.password" placeholder="请输入账户密码"></el-input>
          </el-form-item>
          <el-form-item prop="seccode" label="验证码" class="seccode">
            <!-- <i class=" el-icon-key"></i> -->
            <el-input size="large" placeholder="请输入验证码" v-model="loginForm.seccode"
              @keydown.enter.native="loginClick('loginForm')" @click.once="refreshCode" id="verifyInput"></el-input>
            <s-identify :identifyCode="identifyCode" @click="refreshCode" class="idetify-box"></s-identify>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="submit" class="btn-submit" @click="loginClick('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
  import {
    reactive,
    getCurrentInstance,
    ref,
    onMounted
  } from "vue";
  import {
    useRouter
  } from "vue-router";
  import {
    useStore
  } from "vuex";
  export default {
    name: "login",
    setup() {
      const $router = useRouter();
      const $store = useStore();
      const {
        ctx
      } = getCurrentInstance();
      const loginForm = reactive({
        username: '',
        password: '',
        seccode: '',
      });
      const name = ref('')
      const password = ref('')
      const formRef = ref(null) //当用ref在html页面绑定元素时，记得要在js部分设置初始值，为空
      const identifyCode = ref('')
      const identifyCodes = ref("0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ") //随便打的
      const validateVerifycode = (rule, value, callback) => {
        let newVal = value.toLowerCase()
        /* console.log(newVal)
         debugger */
        let identifyStr = identifyCode.value.toLowerCase()
        if (newVal === '') {
          callback(new Error('请输入验证码'))
        } else if (newVal !== identifyStr) {
          console.log('validateVerifycode:', value)
          callback(new Error('验证码不正确!'))
        } else {
          callback()
        }
      }
      const loginRules = reactive({
        username: [{
          required: true,
          message: '请输入账户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入账户密码',
          trigger: 'blur'
        }],
        seccode: [{
          required: true,
          validator: validateVerifycode,
          trigger: 'blur'
        }]
      })
      const refreshCode = () => { //
        identifyCode.value = "";
        makeCode(identifyCodes.value, 4);
      }
      const randomNum = (min, max) => {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min)
      }
      // 随机生成验证码字符串
      const makeCode = (data, len) => {
        for (let i = 0; i < len; i++) {
          identifyCode.value += data[randomNum(0, data.length - 1)]
        }
      }
      refreshCode() //加一次调用可以使刷新页面时也出现生成一个随机验证码，不至于页面刚加载出来的时候不显示任何数字


      const loginClick = (formName) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            alert('您已成功登录!');
            /* $store.dispatch('user/login',{name:name.value,password:password.value}) */
            await $store.dispatch('user/login', {
              username: loginForm.username,
              password: loginForm.password
            })
            /*           window.localStorage.setItem('nowUserName', username)
                       window.localStorage.setItem('nowUserPassword', password) */
            $router.push('./index');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

      return {
        name,
        password,
        $router,
        loginForm,
        loginClick,
        loginRules,
        formRef,
        identifyCode,
        refreshCode,
      };
    }
  };
</script>

<style scoped lang="scss">
  .bg {
    width: 100%;
    height: 100%;
    background: url(../../../public/bj1.jpg) no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .loginBox {
    background-image: url(../../../public/bj2.jpg);
    background-size: cover;
    z-index: 123;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 83%;
    height: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .card-header {
    color: #FFFEFE;
    font-size: 43.2px;
    font-weight: bold;
    line-height: 70.4px;
    text-align: center;
  }
  .box-card {
    background: transparent !important;
    position: absolute;
    left: 129px;
    top: 45px;
    /deep/.el-card {
      background: transparent !important;
      border: none;
    }
    /deep/.el-card__header {
      background: transparent !important;
      border: none;
    }
    /deep/.el-card__body {
      background: transparent !important;
    }
  }
  .el-form-item {
    /deep/.el-form-item__label{
/*      padding-left: 20px; */
      margin-bottom: -10px;
      font-size: 16px;
      color: #FFFEFE;
    }
    /deep/.el-form-item__content{
      width: 320px;
      height: 41.6px;
    }
  }

  .el-input{
    color: #000000;
    font-size: 19px;
    font-weight: 400;
    color: #000000;
  }
  .el-input {
    #verifyInput{
      width: 190px;
    }
  }
  .el-input {
    /deep/#verifyInput{
      width: 190px;
    }
  }
  .seccode {
    /deep/.el-form-item__content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  .idetify-box{
    height: 38px;
  }
  .btn-submit {
    background: linear-gradient(90deg, #FF6900, #FE7E01, #FFD203);
    width: 320px;
    height: 41.6px;
    margin-top: 30px;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    border: none;
  }
</style>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">登录</div>
      </template>
      <el-form :model="loginForm" :rules="loginRules" ref="formRef">
        <el-form-item prop="username">
          <i class="el-icon-s-custom"></i>
          <el-input size="large" v-model="loginForm.username" placeholder="请输入账户名" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class=" el-icon-lock" ></i>
          <el-input size="large" v-model="loginForm.password" placeholder="请输入账户密码"></el-input>
        </el-form-item>
        <el-form-item prop="seccode">
            <i class=" el-icon-key"></i>
            <el-input size="large" placeholder="请输入验证码" v-model="loginForm.seccode"
              @keydown.enter.native="loginClick('loginForm')" @click.once="refreshCode"></el-input>
            <s-identify :identifyCode="identifyCode"  @click="refreshCode" class="idetify-box"></s-identify>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="submit" class="btn-submit" @click="loginClick('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import { reactive, getCurrentInstance, ref} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "login",
  setup() {
    const $router = useRouter();
    const $store = useStore();
    const { ctx } = getCurrentInstance();
    const loginForm = reactive({
      username: '',
      password: '',
      seccode: ''
    });
    const name = ref('')
    const password = ref('')
    const formRef = ref(null)//当用ref在html页面绑定元素时，记得要在js部分设置初始值，为空
    const identifyCode = ref('')
    const identifyCodes =ref("0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ")//随便打的
    const validateVerifycode = (rule, value, callback) => {
        let newVal = value.toLowerCase()
       /* console.log(newVal)
        debugger */
        let identifyStr =	identifyCode.value.toLowerCase()
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
      username: [
        { required: true, message: '请输入账户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入账户密码', trigger: 'blur' }
      ],
      seccode: [
        { validator: validateVerifycode,  trigger: 'blur' }
      ]
    })
    const loginClick = (formName) => {
        formRef.value.validate((valid) => {
          if (valid) {
            alert('您已成功登录!');
           /* $store.dispatch('user/login',{name:name.value,password:password.value}) */
           $store.dispatch('user/login',{name:loginForm.username, password:loginForm.password})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    const refreshCode = () => {//
            identifyCode.value = "";
            makeCode( identifyCodes.value, 4 );
     }
    const randomNum =(min, max) => {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
     }
               // 随机生成验证码字符串
    const makeCode = (data, len) => {
            for (let i = 0; i < len; i++) {
            identifyCode.value += data[randomNum(0, data.length - 1)]
     }}
    refreshCode()//加一次调用可以使刷新页面时也出现生成一个随机验证码，不至于页面刚加载出来的时候不显示任何数字

    return {
      name,
      password,
      $router,
      loginForm,
      loginClick,
      loginRules,
      formRef,
     identifyCode,
     refreshCode
    };
  }
};
</script>

<style scoped lang="scss">
.box-card{
    height: 500px;
    width: 700px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -350px;
    margin-top: -250px;
}
.card-header{
    color: #FF6B01;
    font-size: 30px;
    font-weight: bold;
  }
.el-form-item {
  /deep/ .el-form-item__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    width:300px;
  }
}
.el-form-item .el-input{
  margin-left: 10px;

}
.el-form-item i{
  font-size: 24px;
}
.btn-submit{
   background:#FF6B01 ;
   opacity: 0.7;
   width: 100px;
   height: 30px;
   margin-top: 10px;
   margin-left: 100px;
   color: #ffffff;
}
.btn-submit:hover{
  opacity: 1;
}
.idetify-box{margin-left: 15px;}
</style>

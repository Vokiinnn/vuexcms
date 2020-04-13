<template>
  <div class="login">
    <el-form
      :model="loginform"
      status-icon
      :rules="rules"
      ref="loginform"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1 class="title">管理员登录</h1>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="loginform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginform.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item class="loginBtn">
        <el-button type="primary" @click="submitForm('loginform')">登录</el-button>
        <el-button @click="register" type="success">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //登录表单
      loginform: {
        username: "",
        password: ""
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 18, message: "长度在4 到 18个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4 到 16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {

    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //保留this指向
          let _this = this;
          //收集用户名和用户密码发送到后端
          this.axios
            .post("/api2/users/checklogin", {
              param: {
                username: _this.loginform.username,
                password: _this.loginform.password
              }
            })
            .then(res => {
              if (res.data.length) {
                //把当前得用户数据存到vuex里
                _this.$store.commit("SAVE_USERINFO", res.data);

                _this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success"
                });
                _this.$router.push("/");
              } else {
                _this.$message({
                  showClose: true,
                  message: "登录失败，请检查账号或密码",
                  type: "error"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  //注册
  register(){
    this.$router.push('/register')
  }


    //清空输入框
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  box-shadow:4px 4px 4px #ccc;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0px 40px 0px 0px;
}
.el-form .title {
  font-size: 22px;
  color: #333;
  padding: 20px 0 20px 160px;
}
.loginBtn{
  padding:0 0 0 50px;
}
</style>

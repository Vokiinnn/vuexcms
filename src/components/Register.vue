<template>
  <div class="register">
    <el-form
      :model="registerform"
      status-icon
      :rules="rules"
      ref="registerform"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1 class="title">管理员注册</h1>
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="registerform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerform.password" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          type="password"
          v-model="registerform.repassword"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="registerform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verify" class="verifybox">
        <el-input type="text" v-model="registerform.verify" class="verifycode"></el-input>
        <el-button @click="sendVerify" class="verifybtn">发送验证码</el-button>
      </el-form-item>

      <el-form-item class="registerBtn">
        <el-button type="primary" @click="registerForm('registerform')">注册</el-button>
        <el-button @click="login" type="success">去登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com)$/;
      if (!value.match(reg)) {
        callback(new Error("请输入正确的邮箱！"));
      }
    };
    return {
      //注册表单
      registerform: {
        username: "",
        password: "",
        repassword: "",
        email: "",
        verify: ""
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
        ],
        repassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" }
        ],
        verify: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请正确输入邮箱验证码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //注册
    registerForm(formName) {
        console.log('789')
     
          //保留this指向
          let _this = this;
          //收集用户名和用户密码发送到后端
          this.axios
            .post("/api/api2/users/register", {
              username: _this.registerform.username,
              password: _this.registerform.password,
              email: _this.registerform.email,
              verify: _this.registerform.verify
            })
            .then(res => {
            //   console.log(res);
                if(res.data.status === 0){
                     _this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: "success"
                    });
                    this.$router.push('/login')
                }
            });
       
    },

    //切换到登录界面
    login() {
      this.$router.push("/login");
    },

    //发送验证码
    sendVerify() {
      //   console.log("verify");
      let _this = this;
      this.axios
        .get("/api/api2/users/verify?email=" + this.registerform.email)
        .then(res => {
          // console.log(res.data.status)
          if (res.data.status !== 0) {
            _this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error"
            });
          } else {
            _this.$message({
              showClose: true,
              message: res.data.msg,
              type: "success"
            });
          }
        })
        
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
  box-shadow: 4px 4px 4px #ccc;
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: 0px 40px 0px 0px;
}

.el-form .title {
  font-size: 22px;
  color: #333;
  padding: 20px 0 20px 160px;
}
.registerBtn {
  padding: 0 0 0 50px;
}
.verifybox {
  display: inline-block;
}
.verifycode {
  width: 180px;
}
.verifybtn {
  height: 40px;
  background-color: lightblue;
}
</style>

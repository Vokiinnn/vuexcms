<!--  -->
<template>
  <div class="index">
    <el-container style=" border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu router  background-color="#545c64" text-color="#fff">
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="userManager">用户管理</el-menu-item>
          <el-menu-item index="blogManager">博客管理</el-menu-item>
          <el-menu-item index="messageManager">留言管理</el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>Hi, {{username}}</span>
          &nbsp;
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="selfInfo">我的</el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="quit">退出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <!-- 出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState({
      username: state => state.userinfo.username
    })
  },
  methods: {
    selfInfo() {
      this.$router.push("/my");
    },
    quit() {
      this.$confirm("正在退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-container,
.index {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-menu {
  border-right: 0;
}
.el-aside,
.el-submenu {
  background-color: #545c64 !important;
}
</style>

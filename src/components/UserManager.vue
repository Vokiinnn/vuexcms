<!--  -->
<template>
  <div class>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户数据</span>
        <div class="seachbox">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button class="seach" size="small" @click="seach">搜索</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="realname" label="真实姓名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="userDel(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//引入辅助函数
import { mapState, mapActions } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    return {
      tableData: [],
      input: "",
      seachInfo: [],
    };
  },
  computed: {
    ...mapState({
      userlist: state => state.userlist
    })
  },

  methods: {
     //初始化，加载数据
    initData() {
      this.$store.dispatch("GET_USERLIST").then(() => {
         this.tableData = this.$store.state.userlist
         this.seachInfo = this.tableData
      });
    },   
    //查找数据
    seach() {
      let _this = this;
      if(this.input === ''){
         this.tableData = this.seachInfo 
      }
         this.tableData = this.tableData.filter(v => {
           return Object.keys(v).some(key => {
             return (
               String(v[key])
                 .toLowerCase()
                 .indexOf(_this.input) > -1
             );
           });
         });
      
    },

    handleClick(row) {
      console.log(row.id);
    },
   //删除数据
    userDel(row) {
      let _this = this;
      this.axios.post("/api/userdel", { id: row.id }).then(res => {
        if (res.data === 1) {
           this.initData()
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        }
      });
    }
  },
  created() {
    this.initData();
  }
};
</script>
<style  scoped>
.text {
  font-size: 14px;
}
.el-card__header {
  position: relative;
}
.clearfix {
  position: relative;
  height: 30px;
}
.seachbox {
  position: relative;
  left: 70%;
  display: inline-flex;
}
/* .el-input {
  width: 16%;
  position: relative;
  right: -61%;
}
.seach {
  position: relative;
  right: -61%;
} */
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
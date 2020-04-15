<!-- 
增加功能：
   1.实现分页功能
    1.1使用pagination插件
    1.2前端向后台查询数据后，后台返回数据
    1.3前端对后台返回的数据进行分页，最后在页面上显示
    有缺点需要改进：
      如果后台一次性返回的数据过多，会造成数据卡死，页面加载时间过长，不能给用户良好的体验

    因为最初的想法是，想要后端进行数据截取，再返回给前端，不用前端进行分页，但技术未能实现
    1.1 前端页面需发送需要查询的参数给后台
      1.1.1 改造函数
    1.2 后台数据库查询，根据前端传送的参数进行查询，返回数据给前端
    1.3 根据返回的结果显示数据


    2.把数据存到state里，不用反复请求数据
      2.1设置mutation、action
      2.2提交commit到state

      bug:
      //删除后某条数据后，页面会跳转会第一页   
      //某一页删除完数据后，页数会跳转到前一页，但前一页的数据不会显示
      //seach函数，查找页面会显示超过10条的数据

    


 -->
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
      <el-table :data="pageData" style="width: 100%">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableData.length"
        layout="prev, pager, next"
      ></el-pagination>
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
      tableData: [], //数据列表
      input: "", //输入值
      seachInfo: [],
      pageData:[],  
      currentPage:1,
      pageSize:10,
      limit:10
    };
  },
  computed: {
    ...mapState({
      userlist: state => state.userlist
    })
  },

  methods: {
    //获取数据
    getuserlist(currentPage){
      this.$store.dispatch('GET_USERLIST').then(() => {
          this.tableData = this.$store.state.userlist
          this.seachInfo = this.tableData;
          this.pageData = this.tableData.slice(currentPage*10-10,currentPage*10)
        })
    },


    //初始化，加载数据
    initData() {
      console.log(this.$store.state.userlist)
      if(this.$store.state.userlist){
          this.tableData = this.$store.state.userlist
          this.seachInfo = this.tableData;
          this.pageData = this.tableData.slice(0,10)
      }else{
          this.getuserlist(this.currentPage)
        }
    },



    //页数改变
    handleSizeChange(size) {
    
    },

    //当前页数改变
    handleCurrentChange(currentPage) {
      console.log('当前页数改变',this.pageSize)
      this.pageData = this.tableData.slice(currentPage*10-10,currentPage*10)
      this.currentPage = currentPage
    },

    //查找数据
    seach() {
      //怎么存一个值，在下次时判断是否一致
      let _this = this;

      
      if (this.input === '') {
        this.tableData = this.seachInfo;
      }

      this.tableData = this.seachInfo.filter(v => {
        // console.log(v)
        return Object.keys(v).some(key => {
          // console.log(key)
          return (
            
            String(v[key])
              .toLowerCase()
              .indexOf(_this.input) > -1
          );
        });
      });
      this.pageData = this.tableData.slice(this.currentPage*10-10,this.currentPage*10)
    },

    handleClick(row) {
      console.log(row.id);
    },
    //删除数据
    
    userDel(row) {
      let _this = this;

      this.axios.post("/api/api2/users/userdel", { id: row.id }).then(res => {
        if (res.data === 1) {
          //当页面显示的数据条数为0时，传给更新函数的页面数 - 1
          if(this.pageData.length - 1 === 0){
            this.currentPage = this.currentPage - 1
          }
          //删除某条数据后，重新从后台获取数据
          this.getuserlist(this.currentPage)

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
.el-pagination {
  width: 100% !important;
  text-align: center;
}
</style>
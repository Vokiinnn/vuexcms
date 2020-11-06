import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


//注册vuex
Vue.use(Vuex)

//状态
const state = {
    userinfo:JSON.parse(localStorage.getItem('userinfo')),
    userlist:JSON.parse(localStorage.getItem('userlist')) 
}

//mutation主要用来操作state
const mutations = {
    //保存用户数据
    SAVE_USERINFO(state, userinfo){
        //先把数据存入本地存储,防止刷新后数据丢失
        localStorage.setItem('userinfo',JSON.stringify(userinfo))
        state.userinfo = userinfo
    },
    // 删除用户数据
    REMOVE_USERINFO(){
        localStorage.removeItem('userinfo')
    },
    //获取用户列表
    GET_USERLIST(state,userlist){
        localStorage.setItem('userlist',JSON.stringify(userlist))
        state.userlist = userlist
    }
}
const actions = {
    GET_USERLIST({ commit }){
        return new Promise((resolve,reject) => {
            axios.post('/api/api2/users/getuserlist').then(res => {
                commit('GET_USERLIST',res.data);
                resolve();
            })
        })
    }
}

//创建store仓库暴露出去
export default new Vuex.Store({
    state,
    mutations,
    actions
})
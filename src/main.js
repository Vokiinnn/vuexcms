// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './vuex/store'

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  if(!to.meta.isLogin){
    next({
      path:'/login'
    })
  }else{
    next()
  }
})

Vue.prototype.axios = axios
Vue.use(ElementUI)
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

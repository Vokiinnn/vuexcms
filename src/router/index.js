import Vue from 'vue'
import Router from 'vue-router'


// import Login from '@/components/Login'
// import Index from '@/components/Index'
const Login = () => import('@/components/Login')
const Frame = () => import('@/components/Frame')
const Index = () => import('@/components/Index')
const UserManager = () => import('@/components/UserManager')
const BlogManager = () => import('@/components/BlogManager')
const MessageManager = () => import('@/components/MessageManager')
const My = () => import('@/components/My')
const test = () => import('@/components/test')
const userEdit = () => import('@/components/userEdit')
const Register = () => import('@/components/Register')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta:{
        keepAlive:false,
        isLogin:true
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta:{
        keepAlive:false,
        isLogin:false
      },
      component: Register
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      meta:{
        keepAlive:false,
        isLogin:true
      },
      component: userEdit
    },
    {
      path: '/test',
      name: 'test',
      meta:{
        keepAlive:false,
        isLogin:false
      },
      component: test
    },
    { 
      redirect:'index',
      path: '/',
      name: 'frame',
      component: Frame,
      children:[
        {
          path: '/index',
          name: 'index',
          meta:{
            keepAlive:false,
            isLogin:true
          },
          component: Index
        },
        {
          path: '/my',
          name: 'my',
          meta:{
            keepAlive:false,
            isLogin:true
          },
          component: My
        },
        {
          path: '/userManager',
          name: 'userManager',
          meta:{
            keepAlive:false,
            isLogin:true
          },
          component: UserManager
        },
        {
          path: '/blogManager',
          name: 'blogManager',
          meta:{
            keepAlive:false,
            isLogin:true
          },
          component: BlogManager
        },
        {
          path: '/messageManager',
          name: 'messageManager',
          meta:{
            keepAlive:false,
            isLogin:true
          },
          component: MessageManager
        }
      ]
    }
  ]
})

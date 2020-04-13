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
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      component: userEdit
    },
    {
      path: '/test',
      name: 'test',
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
          component: Index
        },
        {
          path: '/my',
          name: 'my',
          component: My
        },
        {
          path: '/userManager',
          name: 'userManager',
          component: UserManager
        },
        {
          path: '/blogManager',
          name: 'blogManager',
          component: BlogManager
        },
        {
          path: '/messageManager',
          name: 'messageManager',
          component: MessageManager
        }
      ]
    }
  ]
})

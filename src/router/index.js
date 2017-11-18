import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'

//home模块
import Home from '../components/Home/Home.vue'

//用户相关模块
import Login from '../components/Login/Login'
import UserCenter from '../components/UserCenter/UserCenter'
import ResetPassword from '../components/ResetPass/ResetPassword'
import UserComments from '../components/UserCenter/UserComment'
import UserDetails from '../components/UserCenter/UserDetails'

//通知模块
import Notices from '../components/Notices/Notices'




Vue.use(Router)

const router = new Router({
  routes : [{
    path: '/',
    component: Home,
  }, {
    path: '/login',
    component: Login,
  }, {
    path: '/user-center',
    component: UserCenter,
    children: [{
      path: 'comments',
      component: UserComments
    }, {
      path: 'details',
      component: UserDetails
    }]
  }, {
    path: '/reset-pwd',
    component: ResetPassword
  }, {
    path: '/notices',
    component: Notices
  }]
})


export default router





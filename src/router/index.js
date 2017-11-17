import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Login from '../components/Login/Login'
import UserCenter from '../components/UserCenter/UserCenter'
import ResetPassword from '../components/ResetPass/ResetPassword'
import store from '../store'

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
  }, {
    path: '/reset-pwd',
    component: ResetPassword
  }]
})


export default router





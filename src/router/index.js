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
import UserNotices from '../components/UserCenter/UserNotice'

//主题模块
import Topics from '../components/Topic/Topics'
import NoticesChild from '../components/Topic/Notices-child'

//notice
import NoticeDetail from '../components/Notices/NoticesDetail'
import Notices      from '../components/Notices/Notices'



Vue.use(Router)

const router = new Router({
  routes : [{
    path: '/',
    component: Home,
  }, {
    path: '/login',
    component: Login,
  }, {
    path: '/users/:id',
    component: UserCenter,
    children: [{
      path: 'comments',
      component: UserComments
    }, {
      path: 'notices',
      component: UserNotices
    }]
  }, {
    path: '/reset-pwd',
    component: ResetPassword
  }, {
    path: '/topics',
    component: Topics,
    children: [{
      path: ':id',
      component: NoticesChild
    }],
  }, {
    path: '/notices',
    component: Notices,
    children: [{
      path: ':id',
      component: NoticeDetail
    }]
  }]
})


export default router





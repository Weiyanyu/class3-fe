import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Login from '../components/Login/Login'
import UserCenter from '../components/UserCenter/UserCenter'
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
  }]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/user-center' && !store.getters.isLogined) {
    console.log('en')
    next('/login')
  } else {
    next()
  }
})

export default router





// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false

import App from './App'
import Home from './components/Home/Home.vue'


//导入Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path: '/',
  component: Home,
}]

const router = new VueRouter({
  routes,
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})

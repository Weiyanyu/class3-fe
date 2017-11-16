// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store/index'

Vue.config.productionTip = false

import App from './App'
import router from './router'


//导入Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'



Vue.use(VueResource)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})

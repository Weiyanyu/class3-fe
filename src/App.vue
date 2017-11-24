<template>
<div class="wrapper">
  <!-- 导航栏 -->
  <nav class="navbar navbar-default header">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">CLASS</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/topics/all">所有通知</router-link></li>
        </ul>
        <ul class="nav navbar-nav pull-right">
          <li role="presentation" class="dropdown" v-if="isLogin">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <img class="avatar" :src="userInfo.avatar"/> <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">已登录 : {{userInfo.userName}} ({{ userInfo.studentId }})</li>
              <li><router-link :to="'/users/' + (userInfo !== null ? userInfo.userId : '-1')">用户中心</router-link></li>
              <li v-if="userInfo.role === 1"><router-link to="/admin-notices">添加通知</router-link></li>
              <li class="divider"></li>
              <li class="dropdown-header">账号管理</li>
              <li><router-link to="/reset-pwd">修改密码</router-link></li>
              <li><a class="dropdown-item" @click="logout()">退出登录</a></li>
            </ul>
          </li>
          <router-link to="/login"><button class="btn btn-default login"v-if="!isLogin">登录</button></router-link>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container main-body">
    <router-view></router-view>
  </div>

  <nav class="navbar navbar-inverse footer navbar-fixed-bottom">
    <div class="copyright">
      <p>&#12288;&#12288;&#12288;&#12288;Copyright © 2017 yeonon. 当前呈现版本 1.0</p>
      <span><a class="beian" href="http://www.miitbeian.gov.cn/">京ICP备17065514号</a></span>
      <span>&#12288;过程15-3班版权所有&#12288;项目开源在<a href="https://github.com/Weiyanyu">Github</a></span>
    </div>
  </nav>
</div>



</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: '#app',
  created: function() {
    this.$store.dispatch('checkLogin')
  },
  computed: {
    ...mapGetters({
      isLogin : 'isLogined',
      userInfo : 'getUserInfo'
    })
  },
  methods : {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>

body {
  padding-bottom: 70px;
}

.avatar {
  width: 20px;
  height: 20px;
}
.student-id {
  margin-left: 20px;
}
.dropdown-item {
  cursor: pointer;
}
.login {
  position: relative;
  top: 8px;
}

.navbar-default.header {
  background-color: rgba(0, 0, 0, 0);
  border: none;
} 

.navbar-default.header .navbar-nav > li > a {
  color: #aaa;
}

.navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {
  background-color: rgba(0, 0, 0, 0);
} 


.footer .copyright {
  color: #9d9d9d;
  display: table;
  width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}


</style>

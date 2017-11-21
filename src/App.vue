<template>
<div class="wrapper">
  <!-- 导航栏 -->
  <nav class="navbar navbar-inverse">
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
              <li class="divider"></li>
              <li class="dropdown-header">账号管理</li>
              <li><router-link :to="'/users/' + (userInfo !== null ? userInfo.userId : '-1')">用户中心</router-link></li>
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
html {
  overflow: scroll;
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

</style>

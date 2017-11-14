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
          <li><router-link to="/user-center">用户中心</router-link></li>
        </ul>
        <ul class="nav navbar-nav pull-right">
          <li role="presentation" class="dropdown" v-if="isLogin">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <img class="avatar" src="./assets/logo.png"/> <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">已登录 : {{userInfo.name}} ({{ userInfo.studentId }})</li>
              <li class="divider"></li>
              <li class="dropdown-header">账号管理</li>
              <li><router-link to="/reset-pwd">修改密码</router-link></li>
              <li><a @click="logout()">退出登录</a></li>
            </ul>
          </li>
          <li v-if="!isLogin"><router-link to="/login">登录</router-link></li>
          <li v-if="!isLogin"><router-link to="/register">注册</router-link></li>
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

export default {
  name: '#app',
  computed: {
    isLogin() {
      return this.$store.state.logined
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods : {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style>
.avatar {
  width: 20px;
  height: 20px;
}
.student-id {
  margin-left: 20px;
}
</style>

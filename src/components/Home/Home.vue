<template>
  <transition name="home" mode="in-out">
    <div class="container home">
      <div class="home-background">
        <img class="home-img" src="http://api.dujin.org/bing/1920.php" alt="">
      </div>
      <!-- Standard button -->
      <div class="welcome-info">
        <div class="jumbotron">
          <h1>Hello, World!</h1>
          <p>首页实在是想不到该说什么</p>
          <p>首页实在是想不到该说什么</p>

          <router-link to="/topics/all"><p><a class="btn btn-primary btn-lg" role="button">去看看有哪些通知</a></p></router-link>
        </div>
      </div>
      <p></p>

    </div>


  </transition>

</template>



<style>
@import './style.css';

</style>

<script>
export default {
  created() {
    this.$store.dispatch('getUserInfo')
  },
}

</script>







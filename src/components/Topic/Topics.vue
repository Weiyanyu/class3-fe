<template>
  <div class="wrap">
    <div class="topics btn-groups" v-if="topicList">
      <router-link :to="'/topics/all'"><button @click="getNotices(null, 1)" type="button" class="btn btn-danger btn-lg w">所有通知</button></router-link>
      <router-link :to="'/topics/' + topicList[0].id"><button @click="getNotices(topicList[0].id, 1)" type="button" class="btn btn-success btn-lg w">{{topicList[0].topicName}}</button></router-link>
      <router-link :to="'/topics/' + topicList[1].id"><button @click="getNotices(topicList[1].id, 1)" type="button" class="btn btn-info btn-lg w">{{topicList[1].topicName}}</button></router-link>
      <router-link :to="'/topics/' + topicList[2].id"><button @click="getNotices(topicList[2].id, 1)" type="button" class="btn btn-danger btn-lg w">{{topicList[2].topicName}}</button></router-link>
      <router-link :to="'/topics/' + topicList[3].id"><button @click="getNotices(topicList[3].id, 1)" type="button" class="btn btn-warning btn-lg w">{{topicList[3].topicName}}</button></router-link>
    </div>
    <h3 class="tips">通知如下：（可折叠）</h3>
    <transition name="notice">
      <router-view :key="key"></router-view>
    </transition>
    <nav class="footer-pagination" aria-label="...">
      <ul class="pager">
        <li @click="getNotices(null, pagination.pageNum-1)" v-bind:class="{disabled : !pagination.hasPreviousPage}" class="previous"><a><span aria-hidden="true">&larr;</span> 上一页</a></li>
        <li @click="getNotices(null, pagination.pageNum+1)" v-bind:class="{disabled : !pagination.hasNextPage}" class="next"><a>下一页 <span aria-hidden="true">&rarr;</span></a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  /*这里在Vue实例成功加载之前，我们预先去后端拿一些数据，防止无法渲染数据（因为是异步请求，这一步应该越早越好）*/ 
  beforeCreate() {
    //获取主题数据，主要是获取主题的名字
    this.$store.dispatch('getTopicList')
    //根据ID和pageNum获取通知数据，这里因为后台做了一些复用，id指的是topic id,可以为null，
    //null代表获取所有,pageNum用于分页，首次加载的时候默认为1
    this.$store.dispatch('getNotices', {
      id : null,
      pageNum : 1,
    })
  },
  name: "Topics",
  computed : {
    ...mapGetters({
      topicList : 'getTopics',
      //getter获取分页相关的信息
      pagination : 'getPagination'
    }),
    //这个Key()是用来做子路由的过渡效果的，没有这个就无法实现过渡效果
    key() {
      return this.$route.path.replace(/\//g, '_')
    }
  },
  methods : {
    getNotices(id, pageNum) {
      this.$store.dispatch('getNotices', {
        id : id,
        pageNum : pageNum
      })
    },
  }
};
</script>

<style>
@import './style.css';
</style>



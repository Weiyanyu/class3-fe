<template>

  <div class="wrap">
    <div class="topics btn-groups" v-if="topicList">
      <router-link :to="'/notices/all'"><button @click="getAllNotice()" type="button" class="btn btn-danger btn-lg w">所有通知</button></router-link>
      <router-link :to="'/notices/' + topicList[0].id"><button @click="getNotice(topicList[0].id)" type="button" class="btn btn-success btn-lg w">{{topicList[0].topicName}}</button></router-link>
      <router-link :to="'/notices/' + topicList[1].id"><button @click="getNotice(topicList[1].id)" type="button" class="btn btn-info btn-lg w">{{topicList[1].topicName}}</button></router-link>
      <router-link :to="'/notices/' + topicList[2].id"><button @click="getNotice(topicList[2].id)" type="button" class="btn btn-danger btn-lg w">{{topicList[2].topicName}}</button></router-link>
      <router-link :to="'/notices/' + topicList[3].id"><button @click="getNotice(topicList[3].id)" type="button" class="btn btn-warning btn-lg w">{{topicList[3].topicName}}</button></router-link>
    </div>
    <h3 class="tips">通知如下：（可折叠）</h3>
    <transition name="notice">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  beforeCreate() {
    this.$store.dispatch('getTopicList')
  },
  name: "Topics",
  computed : {
    ...mapGetters({
      topicList : 'getTopics',
    }),
    key() {
      return this.$route.path.replace(/\//g, '_')
    }
  },
  methods : {
    getNotice(id) {
      this.$store.dispatch('getNoticeListById', id)
    },
    getAllNotice() {
      this.$store.dispatch('getNoticeList')
    }
  }
};
</script>

<style>
@import './style.css';
</style>



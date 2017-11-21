<template>
  <div class="heading notices">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h1 class="panel-title">{{detail.noticeTitle}}</h1>
        <div class="meta-info">
          <router-link class="create-user" :to="'/users/' + othersInfo.userId">
            <span class="">
              由&#12288;{{othersInfo.userName}}&#12288;创建
            </span>
          </router-link>
          <span class="create-time">创建时间 : {{detail.createTime}}</span>
          <span class="update-time">更新时间 : {{detail.updateTime}}</span>
        </div>
      </div>
      <div class="panel-body">
        {{detail.noticeDesc}}
      </div>
    </div>
    <h2>用户评论：</h2>
    <div class="comments" v-if="commentListVo">
      <div class="panel panel-default" v-for="(item, index) in commentListVo" :key="index">
        <router-link class="c-user" :to="'/users/' + item.userId">
          <div class="comment-header">
            <img class="c-user-avatar" :src="item.userAvatar" alt="">
            <span class="c-user-name">{{item.userName}}</span>
          </div>
        </router-link>
        <div class="panel-body">
          <p v-html="item.commentDesc" class="c-body">
          </p>
          <span class="push-time">{{item.createTime}}</span>
        </div>
      </div>
    </div>
    <h3>你可以在下面输入你的想法：</h3>
    
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "NoticesDetail",
  beforeCreate() {
    const noticeId = this.$route.params.id
    this.$store.dispatch('getNoticeDetail', noticeId)
  },
  watch: {
    detail: function(newDetail) {
      const othersId = newDetail.userId
      this.$store.dispatch('getOthersInfo', othersId)
    }
  },
  computed: {
    ...mapGetters({
      detail : 'getDetail',
      othersInfo : 'getOthers',
      commentListVo : 'getCommentListVo'
    }),
  },
}
</script>

<style>
@import './style.css';
</style>



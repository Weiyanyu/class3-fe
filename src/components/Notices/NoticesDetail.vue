<template>
  <div class="heading">
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
    <div class="comments" v-if="commentListVo.length > 0">
      <div class="panel panel-default" v-for="(item, index) in commentListVo" :key="index">
        <router-link class="c-user" :to="'/users/' + item.userId">
          <div class="comment-header">
            <img class="c-user-avatar" :src="item.userAvatar" alt="">
            <span class="c-user-name">{{item.userName}}</span>
          </div>
        </router-link>
        <div class="panel-body">
          <p class="c-body">
            {{item.commentDesc}}
          </p>
          <span class="push-time">{{item.createTime}}</span>
        </div>
      </div>
    </div>
    <h3>你可以在下面输入你的想法：</h3>
    <!-- <div class="comment-edit">
      <form>
        <div class="form-group">
          <textarea v-model="newCommentText" class="form-control" rows="6"></textarea>
        </div>
        <button type="submit" class="btn btn-default" @click="addComment">提交评论</button>
      </form>
    </div> -->
    <div id="comment-editor">
      
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import _class from '../../util/class3'


export default {
  name: "NoticesDetail",
  beforeCreate() {
    const noticeId = this.$route.params.id
    this.$store.dispatch('getNoticeDetail', noticeId)
  },
  data() {
    return {
      newCommentText : '',
    }
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
  methods: {
    addComment() {
      const userInfo = this.$store.getters.getUserInfo
      const newComment = {
        userId : userInfo.userId,
        userName : userInfo.userName,
        userAvatar : userInfo.avatar,
        noticeId : this.$store.getters.getDetail.noticeId,
        commentDesc : this.newCommentText,
        createTime : _class.TimeFormater()
      }
      this.$store.getters.getCommentListVo.push(newComment)
      this.$store.dispatch('addComment', {
        noticeId : newComment.noticeId,
        description : newComment.commentDesc
      })
      this.newCommentText = ''
    }
  }
}
</script>

<style>
h2 {
  margin-top: 10px;
  margin-bottom: 20px;
}

.panel-heading .meta-info {
  position: relative;
  top: -49px;
  float: right;
}

.panel-heading .panel-title {
  font-size: 40px;
}


.create-user, .create-user:hover{
  text-decoration: none;
  color: white;
  margin: 0px;
  text-align: left;
}

.c-user-avatar {
  width: 15px;
  height: 15px;
}

.create-time, .update-time {
  display: block;
}

.description .detail {
  position: relative;
  margin-top: 10px;
}

</style>



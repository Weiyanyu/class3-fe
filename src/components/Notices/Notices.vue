<template>
  <div class="wrap">
    <transition :key="key" name="noticeDetail">
      <router-view></router-view>
    </transition>
    <div id="summernote"> 
      
    </div>
    <button type="submit" class="btn btn-default" @click="addComment">提交评论</button>
    
  </div>


</template>

<script>

import 'summernote/dist/summernote.min.js'
import 'summernote/dist/summernote.css'
import 'summernote/dist/lang/summernote-zh-CN.js' 
import _class from '../../util/class3'

export default {
  name: "Notices",
  mounted() {
    $('#summernote').summernote({
      lang: 'zh-CN',
      placeholder : '请在这输入你的观点',
      height: 150,
      minHeight: null,
      maxHeight: null,
      focus: false,
      toolbar : [
        ['style', ['bold', 'italic', 'clear']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul','ol','paragraph']],
      ],
    })
  },
  computed : {
    key() {
      return this.$route.path.replace(/\//g, '_')
    }
  },
  methods: {
    addComment() {
      const userInfo = this.$store.getters.getUserInfo
      const newCommentText = $('#summernote').summernote('code')
      const newComment = {
        userId : userInfo.userId,
        userName : userInfo.userName,
        userAvatar : userInfo.avatar,
        noticeId : this.$store.getters.getDetail.noticeId,
        commentDesc : newCommentText,
        createTime : _class.TimeFormater()
      }
      this.$store.getters.getCommentListVo.push(newComment)
      this.$store.dispatch('addComment', {
        noticeId : newComment.noticeId,
        description : newComment.commentDesc
      }).then(() => {
        $('#summernote').summernote('code', '')
      })
    }
  }
}
</script>

<style>
.comment-header {
  margin-top: 10px;
  margin-left: 10px;
}

.c-user-name {
  padding-left: 10px;
}

.c-user {
  color: #337ab7;
}

.c-user:hover {
  text-decoration: none;
  color: #337ab7;
}
</style>


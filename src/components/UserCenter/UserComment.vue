<template>
  <div class="user-comments" v-if="commentList">
    <ul class="list-group" v-for="(item, index) in commentList" :key="index">
      <p class="notice-title"><span class="label label-info ">{{item.noticeTitle}}</span></p>
      <li class="list-group-item" v-html="item.commentDesc"></li>
    </ul>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  created() {
    $('.comments').addClass('active')
  },
  beforeDestroy() {
    $('.comments').removeClass('active')
  },
  computed: {
    ...mapGetters({
      commentList : 'getCommentList',
    }),
  },
}
</script>

<style>
.user-comments .c-user-avatar {
  height: 15px;
  width: 15px;
}

.notice-title {
  font-size: 20px;
}

</style>



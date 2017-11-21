<template>
  <div class="user-notices" v-if="noticeList">
    <ul class="list-group" v-for="(item, index) in noticeList" :key="index">
      <p class="notice-title"><span class="label label-info ">{{item.title}}</span></p>
      <li class="list-group-item" v-html="item.description"></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  created() {
    $('.details').addClass('active')
  },
  beforeDestroy() {
    $('.details').removeClass('active')
  },
  computed: {
    ...mapGetters({
      noticeList : 'getNotices',
    }),
  },
}
</script>


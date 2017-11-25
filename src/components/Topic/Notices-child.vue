<template>
  <div class="panel-group topic-notices" id="accordion" v-if="noticeList">
    <div class="panel panel-default" v-for="(item, index) in noticeList" v-bind:key="index">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" 
          v-bind:href="'#collapse' + index" >
          {{item.noticeTitle}}
          </a>
        </h4>
      </div>
      <div v-bind:id="'collapse' + index" class="panel-collapse collapse in">
        <div class="panel-body">
          <p v-html="item.description"></p>
          <router-link :to="'/notices/' + item.noticeId" ><span class="go-detail btn btn-default">查看详情</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Notices",
  computed : {
    ...mapGetters({
      noticeList : 'getNotices',
    })
  }
};
</script>

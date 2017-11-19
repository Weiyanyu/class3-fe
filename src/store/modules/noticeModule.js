import * as types from '../mutation-types'
import _notice from '../../service/notice-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
  errMsg : '',
  list: [],
  pageNum : 1,
  hasPreviousPage : false,
  hasNextPage : false,
  mainImage : '',
}

//getter
const getters = {
  getNotices : state => state.list,
  getPagination : function(state) {
    return {
      pageNum : state.pageNum,
      hasPreviousPage : state.hasPreviousPage,
      hasNextPage : state.hasNextPage
    }
  }
}

const actions = {
  getNotices({commit}, param) {
    _notice.getNoticeList(param.id, param.pageNum, function(res) {
      commit(types.GET_NOTICE_LIST, res)
    }, function(err) {

    })
  },
}

const mutations = {
  [types.GET_NOTICE_LIST] (state, res) {
    state.list = res.list
    state.hasNextPage = res.hasNextPage
    state.hasPreviousPage = res.hasPreviousPage
    state.pageNum = res.pageNum
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}




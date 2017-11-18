import * as types from '../mutation-types'
import _notice from '../../service/notice-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
  errMsg : '',
  list: [],
  pageNum : 1,
  pageSize : 10,
  size : 2,
  isFirstPage : true,
  isLastPage : true,
  hasPreviousPage : false,
  hasNextPage : false,
  mainImage : '',
}

//getter
const getters = {
  getNotices : state => state.list
}

const actions = {
  //获取整个列表
  getNoticeList({commit}) {
    _notice.getNoticeAllList(function(res) {
      commit(types.GET_NOTICE_LIST, res)
    }, function(err) {

    })
  },
  getNoticeListById({commit}, id) {
    _notice.getNoticeList(id, function(res) {
      commit(types.GET_NOTICE_LIST_BY_ID, res)
    }, function(err) {

    })
  }
}

const mutations = {
  [types.GET_NOTICE_LIST] (state, res) {
    state.list = res.list
  },

  [types.GET_NOTICE_LIST_BY_ID] (state, res) {
    state.list = res.list
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}




import * as types from '../mutation-types'
import _notice from '../../service/notice-service'
import _comment from '../../service/comment-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
  noticeErrMsg : '',
  list: [],
  pageNum : 1,
  hasPreviousPage : false,
  hasNextPage : false,
  mainImage : '',
  detail : {},
  comment : [],
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
  },
  getDetail : state => state.detail,
  getCommentListVo : state => state.detail.commentDetailVoList,
  getNoticeListLen : state => state.list.length,
  getNoticeErrMsg : state => state.noticeErrMsg
}

const actions = {
  getNotices({commit}, param) {
    _notice.getNoticeList(param.id, param.pageNum, function(res) {
      commit(types.GET_NOTICE_LIST, res)
    }, function(err) {

    })
  },

  getNoticeDetail({commit}, noticeId) {
    _notice.getNoticeDetail(noticeId, function(res) {
      commit(types.GET_NOTICE_DETAIL, res)
    }, function(err) {

    })
  },

  getNoticesByUserId({commit}, userId) {
    _notice.getNoticeListByUserId(userId, function(res) {
      commit(types.GET_NOTICE_LIST_BY_USER_ID, res)
    }, function(err) {

    })
  },

  addComment({commit}, comment) {
    _comment.addComment(comment, function(res) {
      
    }, function(err) {
      
    }) 
  },


  uploadNoticeFile({commit}, file) {
    _notice.uploadFileInNotice(file, function(res) {

    }, function(err) {

    })
  },

  addNotice({commit}, newNotice) {
    _notice.addNotice(newNotice, function(res) {
      commit(types.ADD_NOTICE)
    }, function(err) {
      commit(types.NOTICE_ERR, err)
    })
  },

  formValidErr({commit}, err) {
    commit(types.NOTICE_ERR, err)
  }
}

const mutations = {
  [types.GET_NOTICE_LIST] (state, res) {
    state.list = res.list
    state.hasNextPage = res.hasNextPage
    state.hasPreviousPage = res.hasPreviousPage
    state.pageNum = res.pageNum
  },

  [types.GET_NOTICE_DETAIL] (state, res) {
    state.detail = res
  },

  [types.GET_NOTICE_LIST_BY_USER_ID] (state, res) {
    state.list = res
  },

  [types.ADD_NOTICE] (state) {
    state.noticeErrMsg = ''
  },

  [types.NOTICE_ERR] (state, err) {
    state.noticeErrMsg = err
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}




import * as types from '../mutation-types'
import _comment from '../../service/comment-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
  errMsg : '',
  list : [],
}

//getter
const getters = {
  getCommentList : state => state.list,
  getCommentListLen : state => state.list.length
}

//actios
const actions = {
  getCommentListByUserId({commit}, userId) {
    _comment.getCommentListByUserId(userId, function(res) {
      commit(types.GET_COMMENT_LIST, res)
    }, function(err) {

    })
  }
}

//mutations
const mutations = {
  [types.GET_COMMENT_LIST] (state, res) {
    state.list = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}




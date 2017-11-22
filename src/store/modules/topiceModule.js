import * as types from '../mutation-types'
import _topic from '../../service/topic-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
  TopiceErrMsg : '',
  list: [],

}

//getter
const getters = {
  getTopics : state => state.list
}

const actions = {
  //获取整个列表
  getTopicList({commit}) {
    _topic.getTopicList(function(res) {
      commit(types.GET_TOPIC_LIST, res)
    }, function(err) {

    })
  }
}

const mutations = {
  [types.GET_TOPIC_LIST] (state, res) {
    state.list = res.list
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}




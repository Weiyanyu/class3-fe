import * as types from './mutation-types'
import _user from '../service/user-service'

export default {
    //登出
    logout({commit}) {
        _user.logout(function(res) {
            commit(types.LOGOUT)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },
    //登录
    login({commit}, userInfo) {
        _user.login(userInfo, function(res) {
            commit(types.LOGIN, res)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },

    //错误处理
    error({commit}, errMsg) {
        commit(types.ERROR, errMsg)
    }

}
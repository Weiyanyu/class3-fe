import * as types from './mutation-types'
import router from 'vue-router'

export default {
    //登出
    [types.LOGOUT] (state) {
        state.logined = false
    },
    //登录
    [types.LOGIN] (state, res) {
        state.userInfo = res
        state.logined = true
        state.errMsg = ''
    },
    //错误处理
    [types.ERROR] (state, errMessage) {
        state.errMsg = errMessage
    }
}
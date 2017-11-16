import * as types from '../mutation-types'
import _user from '../../service/user-service'
import router from '../../router'
import _class3 from '../../util/class3'

//state
const state = {
	errMsg : '',
    logined : false,
	userInfo : {
		userId : -1,
		studentId: '',
		userName: '',
		email: '',
		avatar : '',
		question : '',
		answer	: '',
		role	: -1,
		createTime : '',
		updateTime : '',
		banned : '',
	}
}

const getters = {
    isLogined : state => state.logined,
    getUserInfo : state => state.userInfo,
    getErrMsg : state => state.errMsg,
}

//actions
const actions = {
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
            //这里尝试各种办法，没有想到很好的办法，只能在action里处理跳转了
            router.go(-1)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },

    //检查登录
    checkLogin({commit}) {
        _user.checkLogin(function(res) {
            commit(types.CHECK_LOGIN, res)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },
    

    //错误处理
    error({commit}, errMsg) {
        commit(types.ERROR, errMsg)
    }
}

//mutations
const mutations = {
    //登出
    [types.LOGOUT] (state) {
        state.logined = false
        state.userInfo = null
    },
    //登录
    [types.LOGIN] (state, res) {
        res.createTime = _class3.TimeFormater(res.createTime)
        res.updateTime = _class3.TimeFormater(res.updateTime)
        state.logined = true
        state.userInfo = res
        state.errMsg = ''
    },
    //错误处理
    [types.ERROR] (state, errMessage) {
        state.errMsg = errMessage
    },

    [types.CHECK_LOGIN] (state, res) {
        if (res) {
            state.logined = true
            state.userInfo = res
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
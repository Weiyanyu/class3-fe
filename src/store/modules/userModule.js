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
        profile : '',
	}
}

const getters = {
    isLogined : state => state.logined,
    getUserInfo : state => state.userInfo,
    getErrMsg : state => state.errMsg,
    getUserId : state => state.userInfo ? state.userInfo.userId : -1
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
            router.push('/')
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
    
    //更新用户信息
    updateUserInfo({commit, dispatch}, userInfo) {
        _user.updateUserInfo(userInfo, function(res) {
            dispatch('getUserInfo')
        }, function(err) {
            commit(types.ERROR, err)
        })
    },

    //获取用户信息
    getUserInfo({commit}) {
        _user.getUserInfo(function(res) {
            commit(types.UPDATE_INFO, res)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },

    //上传头像
    uploadAvatar({commit}, avatar) {
        _user.uploadAvatar(avatar, function(res) {
            commit(types.UPLOAD_AVATAR, res)
        }, function(err) {
            commit(types.ERROR, err)
        })
    },

    //使用旧密码更新密码
    resetPwd({commit}, formData) {
        _user.resetPwd(formData, function(res) {
            commit(types.RESET_PWD)
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
        state.errMsg = ''
    },
    //登录
    [types.LOGIN] (state, res) {
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
    },

    [types.UPDATE_INFO] (state, res) {
        state.userInfo = res
    },

    [types.UPLOAD_AVATAR] (state, res) {
        state.userInfo.avatar = res.url
    },

    [types.RESET_PWD] (state) {
        state.logined = false
        state.errMsg = ""
        state.userInfo = null
        router.push('/login')

    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
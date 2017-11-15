import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const conf = {
	imageHost : ''
}

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

export default new Vuex.Store({
	state,
	mutations,
	actions,
})


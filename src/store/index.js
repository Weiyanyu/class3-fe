import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
	logined : true,
	userInfo : {
		studentId: '2015010622',
		name: 'yeonon',
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})


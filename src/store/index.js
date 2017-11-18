import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



import userModule from './modules/userModule'
import noticeModule from './modules/noticeModule'
import topicModule from './modules/topiceModule'

export default new Vuex.Store({
	modules : {
		userModule,
		noticeModule,
		topicModule,
	}
})


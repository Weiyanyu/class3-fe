import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



import userModule from './modules/userModule'

export default new Vuex.Store({
	modules : {
		userModule,
	}
})


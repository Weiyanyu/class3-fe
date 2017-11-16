import _class3 from '../util/class3'

export default {
	//登录
	login 	: function(userInfo, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			data		: 		userInfo,
			method		:		'POST',
			success		:		resolve,
			error		:		reject
		})
	},

	logout	:	function(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'DELETE',
			success		:		resolve,
			error		:		reject
		})
	},

	checkLogin : function(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'GET',
			success		:		resolve,
			error		:		reject
		})
	},
}
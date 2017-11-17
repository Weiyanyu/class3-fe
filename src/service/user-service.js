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

	updateUserInfo : function(userInfo, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal"),
			data		: 		userInfo,
			method		:		'PUT',
			success		:		resolve,
			error		:		reject
		})
	},

	getUserInfo : function(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal"),
			method		:		'GET',
			success		:		resolve,
			error		:		reject
		})
	},

	uploadAvatar : function(avatar, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal/avatar/upload"),
			data		: 		avatar,
			method		:		'POST',
			success		:		resolve,
			error		:		reject,
			processData : 		false,
			contentType : 		false,
		})
	},

	resetPwd : function(formData, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal/password/update"),
			data		: 	{
				userId 			: formData.userId,
				oldPassword : formData.oldPassword,
				newPassword : formData.newPassword,
			},
			method		:		'POST',
			success		:		resolve,
			error			:		reject
		})
	},
}
import _class3 from '../util/class3'

export default {
	//登录
	login(userInfo, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			data		: 		userInfo,
			method		:		'POST',
			withCredentials : true,
			success		:		resolve,
			error		:		reject
		})
	},

	logout(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'DELETE',
			withCredentials : true,
			success		:		resolve,
			error		:		reject
		})
	},

	checkLogin(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'GET',
			withCredentials : true,
			success		:		resolve,
			error		:		reject
		})
	},

	updateUserInfo(userInfo, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal"),
			data		: 		userInfo,
			method		:		'PUT',
			cache : false,
			success		:		resolve,
			error		:		reject
		})
	},

	getUserInfo(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/personal"),
			method		:		'GET',
			success		:		resolve,
			error		:		reject
		})
	},

	uploadAvatar(avatar, resolve, reject) {
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

	resetPwd(formData, resolve, reject) {
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

	getothersInfo(othersId, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/users/" + othersId),
			method		:		'GET',
			success		:		resolve,
			error			:		reject
		})
	},
}
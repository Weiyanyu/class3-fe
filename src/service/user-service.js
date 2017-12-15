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

	//登出
	logout(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'DELETE',
			withCredentials : true,
			success		:		resolve,
			error		:		reject
		})
	},

	//检查是否登录
	checkLogin(resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/session"),
			method		:		'GET',
			withCredentials : true,
			success		:		resolve,
			error		:		reject
		})
	},

	//更新用户信息
	updateUserInfo(userInfo, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/users"),
			data		: 		{
				userName : userInfo.userName,
				profile : userInfo.profile,
				avatar : userInfo.avatar,
			},
			method		:		'PUT',
			cache : false,
			success		:		resolve,
			error		:		reject
		})
	},

	//获取用户信息
	getUserInfo(userId, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/users/" + userId),
			method		:		'GET',
			success		:		resolve,
			error		:		reject
		})
	},

	uploadAvatar(avatar, resolve, reject) {
		_class3.requestAPI({
			url			:		_class3.getServerUrl("/users/avatar/upload"),
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
			url			:		_class3.getServerUrl("/users/password/update"),
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
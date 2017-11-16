import $ from 'jquery'

const conf = {
	serverHost: '',
}

export default {
	requestAPI: function (param) {
		const _this = this;
		$.ajax({
			type		: param.method || 'GET',
			url			: param.url || '',
			dataType: param.type || 'json',
			data		: param.data,
			success	: function (res) {
				//请求成功
				if (res.status === 0) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//服务器请求成功，但是存在请求参数或者服务器异常等情况
				else if (res.status === 1) {
					typeof param.success === 'function' && param.error(res.msg);
				}
			},
			error		: function (err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	getServerUrl: function (path) {
		return conf.serverHost + path
	},

	//验证字段
	valid : function(val, type) {
		const value = $.trim(val)
		if ('require' === type) {
			return !!value;
		}
		if ('studentId' === type) {
			return /^\d{10}$/.test(value)
		}
		if ('email' === type) {
			return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)
		}
	},
	TimeFormater : function(timestamp) {
		const crDate = new Date()
		crDate.setTime(timestamp)
		return crDate.toLocaleString()
	}
}
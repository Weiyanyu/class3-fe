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
				else if (res.status === 10) {
					window.location.href = "./login?redirect=" + encodeURIComponent(window.location.href);
				}
			},
			error		: function (err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	getServerUrl: function (path) {
		return conf.serverHost + path
	}
}
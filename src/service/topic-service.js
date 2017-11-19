import _class from '../util/class3'

export default {
  getTopicList(resolve, reject) {
    _class.requestAPI({
      url     : _class.getServerUrl('/topics/'),
			method		:		'GET',
			success		:		resolve,
			error		:		reject
    })
  },
  
}
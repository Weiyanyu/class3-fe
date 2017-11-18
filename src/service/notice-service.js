import _class from '../util/class3'

export default {
  getNoticeAllList(resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/notices/'),
			method		:		'GET',
			success		:		resolve,
			error		  :		reject
    })
  },

  getNoticeList(id, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/notices/'),
      method		:		'GET',
      data      : {
        topicId  : id
      },
			success		:		resolve,
			error		  :		reject
    })
  }
}
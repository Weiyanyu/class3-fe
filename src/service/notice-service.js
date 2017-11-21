import _class from '../util/class3'

export default {
  getNoticeList(id, pageNum, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/notices/'),
      method		:		'GET',
      data      : {
        topicId   : id,
        pageNum   : pageNum,
      },
			success		:		resolve,
			error		  :		reject
    })
  },

  getNoticeDetail(id, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/notices/' + id),
      method		:		'GET',
			success		:		resolve,
			error		  :		reject
    })
  },

  getNoticeListByUserId(userId, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/notices/user/' + userId),
      method		:		'GET',
			success		:		resolve,
			error		  :		reject
    })
  },
}
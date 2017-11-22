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

  uploadFileInNotice(file, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/manage/notices/upload_file'),
      method		:		'POST',
      data : {
        noticeFile : file,
      },
			success		:		resolve,
			error		  :		reject
    })
  },

  addNotice(newNotice, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/manage/notices/'),
      method		:		'POST',
      data : newNotice,
			success		:		resolve,
			error		  :		reject
    })
  },
}
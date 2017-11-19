import _class from '../util/class3'

export default {
  getNoticeList(id, pageNum, resolve, reject) {
    console.log('pageNum ' + pageNum)
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
  }
}
import _class from '../util/class3'

export default {
  addComment(comment, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/comments/'),
      method		:		'POST',
      data      : {
        noticeId   : comment.noticeId,
        description   : comment.description,
      },
			success		:		resolve,
			error		  :		reject
    })
  },

  getCommentListByUserId(userId, resolve, reject) {
    _class.requestAPI({
      url       : _class.getServerUrl('/comments/'),
      method		:		'GET',
      data      : {
        userId : userId,
      },
			success		:		resolve,
			error		  :		reject
    })
  },

}
import api from '../../api'

export default {
  getComments(slug) {
    if (slug)
      return api.get(`/comments?post=${slug}`)
    else
      return api.get('/comments')
  },
  submitComment(data) {
  	return api.post(`/comments/${data.postSlug}`, data)
  },
  deleteComment(id) {
  	return api.delete(`/comments/${id}`)
  }
}
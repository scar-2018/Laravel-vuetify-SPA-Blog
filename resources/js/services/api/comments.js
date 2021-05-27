export default {
  getComments(slug) {
    if (slug)
      return axios.get(`/comments?post=${slug}`)
    else
      return axios.get('/comments')
  },
  submitComment(data) {
  	return axios.post(`/comments/${data.postSlug}`, data)
  },
  deleteComment(id) {
  	return axios.delete(`/comments/${id}`)
  }
}
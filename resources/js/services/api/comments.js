export default {
  getComments(post) {
    return axios.get(`/comments/${post}`)
  },
  submitComment(data) {
  	return axios.post(`/comments/${data.postSlug}`, data)
  }
}
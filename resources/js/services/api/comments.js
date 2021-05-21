export default {
  getComments(post) {
    return axios.get(`/comments/${post}`)
  }
}
export default {
  getPosts() {
    return axios.get('/posts')
  },
  getPost(slug) {
    return axios.get(`/posts/${slug}`)
  },
  addVisits(slug) {
    return axios.post(`/posts/${slug}/add-visits`)
  }
}
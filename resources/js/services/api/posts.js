export default {
  getPosts() {
    return axios.get('/posts')
  },
  getPost(slug) {
    return axios.get(`/posts/${slug}`)
  }
}
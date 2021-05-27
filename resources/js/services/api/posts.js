export default {
  getPosts(queryObject) {
  	let append = '?'
  	for (const [key, value] of Object.entries(queryObject)) {
  	  append += `&${key}=${value}`
    }

    return axios.get(`/posts${append}`)
  },
  getPost(slug) {
    return axios.get(`/posts/${slug}`)
  },
  addVisits(slug) {
    return axios.post(`/posts/${slug}/add-visits`)
  },
  createPost(data) {
    return axios.post('/posts', data)
  },
  updatePost(data) {
    return axios.put(`/posts/${data.slug}`, data)
  },
  deletePost(slug) {
    return axios.delete(`/posts/${slug}`)
  }
}
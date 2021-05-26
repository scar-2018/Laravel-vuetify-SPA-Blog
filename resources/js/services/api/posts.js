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
  }
}
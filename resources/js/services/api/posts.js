import api from '../../api'

export default {
  getPosts(queryObject) {
  	let append = '?'
    
  	for (const [key, value] of Object.entries(queryObject)) {
  	  append += `&${key}=${value}`
    }

    return api.get(`/posts${append}`)
  },
  getPost(slug) {
    return api.get(`/posts/${slug}`)
  },
  addVisits(slug) {
    return api.post(`/posts/${slug}/add-visits`)
  },
  createPost(data) {
    return api.post('/posts', data)
  },
  updatePost(data) {
    return api.post(`/posts/${data.get('slug')}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deletePost(slug) {
    return api.delete(`/posts/${slug}`)
  }
}
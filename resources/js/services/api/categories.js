export default {
  getCategories() {
    return axios.get('/categories')
  },
  updateCategory(data) {
    return axios.put(`/categories/${data.id}`, data)
  },
  deleteCategory(id) {
    return axios.delete(`/categories/${id}`)
  },
  createCategory(data) {
    return axios.post('/categories', data)
  }
}
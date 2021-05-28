import api from '../../api'

export default {
  getCategories() {
    return api.get('/categories')
  },
  updateCategory(data) {
    return api.put(`/categories/${data.id}`, data)
  },
  deleteCategory(id) {
    return api.delete(`/categories/${id}`)
  },
  createCategory(data) {
    return api.post('/categories', data)
  }
}
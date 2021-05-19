export default {
  getCategories() {
    return axios.get('/categories')
  }
}
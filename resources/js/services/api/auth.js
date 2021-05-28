import api from '../../api'

export default {
  login(payload) {
    return api.post('/auth/login', payload)
  },
  getAuthUser() {
    return api.get('/auth/user')
  },
  signOut() {
    return api.get('/auth/logout')
  }
}
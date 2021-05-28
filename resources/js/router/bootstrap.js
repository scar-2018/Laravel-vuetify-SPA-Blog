import store from '../store'
import api from '../api'

async function bootstrap() {
  const token = localStorage.getItem('token')
  let user = null

  if (token) {
    try {
      const response = await api.get('/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      user = response.data.user

      store.commit('auth/BOOTSTRAP', {
        user,
        token
      }, { root: true })
    } catch (error) {
      localStorage.removeItem('token')
      // window.location = '/auth/signin'
    }
  } else {
    store.commit('auth/BOOTSTRAP', {
      user: null,
      token: ''
    }, { root: true })
  }

  // setTimeout(hideLoading, 100)
}

export default bootstrap
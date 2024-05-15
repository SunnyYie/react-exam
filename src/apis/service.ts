import axios from 'axios'
import event from '@/utils/event'

const instance = axios.create({})
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  function (config) {
    if (config.url) {
      config.url = 'http://localhost:8080' + config.url
    }

    if (document.cookie) {
      config.headers['cookie'] = document.cookie
    }

    console.log(document.cookie, 'cookie')

    return config
  },
  function (error) {},
)

instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.code === 401) {
        event.emit('global_not_login', response.data.msg)
        return Promise.reject('没有登录状态')
      }
    }

    return response
  },
  function (error) {
    // EventBus.emit('global_error_tips', error.response.data.message)
    return Promise.reject(error)
  },
)

export default instance

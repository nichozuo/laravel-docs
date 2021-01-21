import axios from 'axios'
import { notification } from 'ant-design-vue'
import router from '@/router/index'
import store from '@/store/index'

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (data: { message: string; description: string }) => {
  notification['error']({
    message: data.message,
    description: data.description,
  })
}

const handleError = (data: { message: string }) => {
  notification['error']({
    message: '系统异常',
    description: data.message,
  })
}

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL: '/api/docs/home',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    store.dispatch('loading/addLoadingAction')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    store.dispatch('loading/subLoadingAction')
    const { code } = response.data
    if (code === 0) {
      return response.data
    } else if (code === 10000) {
      if (location.pathname != '/login') {
        router.push('/login')
      }
      return Promise.reject(response.data)
    } else {
      handleCode(response.data)
      return Promise.reject(response.data)
    }
  },
  (error) => {
    store.dispatch('loading/subLoadingAction')
    const { response } = error
    console.log('response error', response)
    if (error.response && error.response.data) {
      handleCode(response.data)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
        handleError({ message: message })
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
        handleError({ message: message })
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
        handleError({ message: message })
      }
      message.error(message || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance

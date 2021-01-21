import axios from '@/plugins/axios'
import { AxiosRequestConfig } from 'axios'

export const requests = (options: AxiosRequestConfig) => {
  return axios({ method: 'post', ...options } as AxiosRequestConfig)
}

export const API = {
  docs: {
    refresh: 'refresh',
    getMenu: 'get_menu',
  },
}

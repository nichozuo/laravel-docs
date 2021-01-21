import axios from '@/plugins/axios'
import { AxiosRequestConfig } from 'axios'

export const requests = (options: AxiosRequestConfig) => {
  return axios({ method: 'post', ...options } as AxiosRequestConfig)
}

export const API = {
  docs: {
    getContent: 'get_content',
    getMenu: 'get_menu',
  },
}

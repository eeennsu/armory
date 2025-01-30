import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios-instance'

interface Params<T = undefined> {
    url: string
    method?: 'get' | 'post' | 'put' | 'delete'
    data?: T
    configs?: AxiosRequestConfig
}

export const requestHandler = async <T, U = any>({ method = 'get', url, data, configs }: Params<T>): Promise<U> => {
    try {
        if (method === 'get' || method === 'delete') {
            return (await axiosInstance[method](url, configs))?.data
        }

        return (await axiosInstance[method](url, data, configs))?.data
    } catch (error) {
        console.error(`❌ API 요청 실패: ${method.toUpperCase()} ${url}`, error)
        throw error
    }
}

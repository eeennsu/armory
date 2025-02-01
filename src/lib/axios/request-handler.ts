import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { pokemonInst, jphInst } from './axios-instances'

interface Params<T = undefined> {
    url: string
    method?: 'get' | 'post' | 'put' | 'delete'
    data?: T
    configs?: AxiosRequestConfig
}

const makeRequestHandler = (axiosInstance: AxiosInstance) => {
    return async <T, U = any>({ method = 'get', url, data, configs }: Params<T>): Promise<U> => {
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
}

export const jphRequestHandler = makeRequestHandler(jphInst)
export const pokeRequestHandler = makeRequestHandler(pokemonInst)
